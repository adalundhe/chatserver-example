import { Server as SocketIOServer } from "socket.io";
import express from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import { ChatEvent } from "../constants/chat";
import { Message } from "../types/chat";
import { User } from "../types/user";
import { UserServiceClient } from "./UserServiceClient";
import { RoomServiceClient } from "./RoomServiceClient";
import { KafkaServer } from "./KafkaServer";
import { v4 as uuidv4 } from "uuid";


export class ChatService {
    public static readonly PORT: number = 5080;
    private _app: express.Application;
    private server: Server;
    private io: SocketIOServer;
    private port: string | number;
    private userClient: UserServiceClient;
    private roomClient: RoomServiceClient;
    private kafka: KafkaServer;

    constructor(){
        this._app = express();

        this.port = process.env.PORT || ChatService.PORT;

        this._app.use(cors());
        this.server = createServer(this._app);
        this.io = new SocketIOServer(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
          });

        this.userClient = new UserServiceClient();
        this.roomClient = new RoomServiceClient();
        this.kafka = new KafkaServer({});
    }

    

    async listen (): Promise<void> {
        await this.kafka.connect();
        await this.server.listen(this.port);
        console.log(`Server running on port: ${this.port}. `);

        await this.io.use(async (socket, next) => {
                if (socket.handshake.auth.token){
                    await this.roomClient.getRoom({
                        roomName: socket.handshake.query.room as string,
                        token: socket.handshake.auth.token,
                        callback: async (room) => {
                            if (room.token !== socket.handshake.auth.token){
                                next(new Error('Unauthorized.'))
                            }
                            
                            next()
                        }
                    });
                }
                else {
                    next(new Error('Unauthorized.'));
                }

            });
            
        await this.io.on(ChatEvent.CONNECT, (socket) => {
            console.log(`Client connected on port: ${this.port}`);

            socket.on(ChatEvent.REGISTER, async (user: User) => {

                const messageString = `${new Date().toISOString()} - ${user.name} is here!.`;

                await this.userClient.createOrUpdateUser({
                    user,
                    callback: async (userName: string) => {
                        await this.kafka.produce({
                            topic: user.currentRoom as string,
                            message: {
                                id: uuidv4(),
                                user: userName,
                                message: messageString,
                                room: user.currentRoom as string
                            }
                        });

                        await this.io.to(user.currentRoom as string).emit(ChatEvent.REGISTER, messageString);
                    }
                });

            });

            socket.on(ChatEvent.JOIN, async (user: User) => {   
                await socket.join(user.currentRoom);

                await this.kafka.produce({
                    topic: user.currentRoom as string,
                    message: {
                        id: uuidv4(),
                        user: user.name,
                        message: `${new Date().toISOString()} - ${user.name} joined room ${user.currentRoom}`,
                        room: user.currentRoom as string
                    }
                });

                await this.io.to(user.currentRoom as string).emit(ChatEvent.JOIN, `${user.name} joined room ${user.currentRoom}`);
    
            });

            socket.on(ChatEvent.MESSAGE, async (message: Message) => {

                const messageString = `${new Date().toISOString()} - ${message.user}: ${message.message}`
                await this.kafka.produce({
                    topic: message.room,
                    message: {
                        id: uuidv4(),
                        user: message.user,
                        message: messageString,
                        room: message.room
                    }
                });


                await this.io.to(message.room).emit(ChatEvent.MESSAGE, messageString);
                
            });

            socket.on(ChatEvent.LEAVE, async (user: User) => {

                const messageString = `${new Date().toISOString()} - ${user.name} - left room.`;

                console.log(user.currentRoom)
                await this.io.to(user.currentRoom as string).emit(ChatEvent.LEAVE, messageString);
                await this.kafka.produce({
                    topic: user.currentRoom as string,
                    message: {
                        id: uuidv4(),
                        user: user.name,
                        message: messageString,
                        room: user.currentRoom as string
                    }
                });

                await socket.disconnect();
            });

            socket.on(ChatEvent.DISCONNECT, async () => {
                console.log('Client disconnected.')
            });

        });

    }

    get app(): express.Application {
        return this._app;
    }

}