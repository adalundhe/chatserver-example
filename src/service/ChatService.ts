import { Server as SocketIOServer } from "socket.io";
import express from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import { ChatEvent } from "../constants/chat";
import { Message } from "../types/chat";
import { User } from "../types/user";
import { UserServiceClient } from "./UserServiceClient";
import { RoomServiceClient } from "./RoomServiceClient";


export class ChatService {
    public static readonly PORT: number = 8000;
    private _app: express.Application;
    private server: Server;
    private io: SocketIOServer;
    private port: string | number;
    private userClient: UserServiceClient;
    private roomClient: RoomServiceClient;

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
    }

    

    async listen (): Promise<void> {
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

                await this.userClient.createOrUpdateUser({
                    user,
                    callback: async (userName: string) => {
                        await this.io.to(user.currentRoom as string).emit('register',`User ${userName} registered.`)
                    }
                });
            });

            socket.on(ChatEvent.JOIN, async (user: User) => {   
                await socket.join(user.currentRoom);
                await this.io.to(user.currentRoom as string).emit('join', `${user.name} joined room ${user.currentRoom}`);
    
            });

            socket.on(ChatEvent.MESSAGE, async (message: Message) => {
                await this.io.to(message.room).emit('message', `${new Date().toISOString()} - ${message.user}: ${message.message}`);
                
            });

            socket.on(ChatEvent.LEAVE, async (user: User) => {
                await this.io.to(user.currentRoom as string).emit('leave', `User - ${user.name} - left room.`);
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