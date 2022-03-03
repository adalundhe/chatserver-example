import { Server as SocketIOServer } from "socket.io";
import express from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import { ChatEvent } from "../constants/chat";
import { Message } from "../types/chat";

export class ChatService {
    public static readonly PORT: number = 8000;
    private _app: express.Application;
    private server: Server;
    private io: SocketIOServer;
    private port: string | number;

    constructor(){

        const allowedOrigins = ['*'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        this._app = express();

        this.port = process.env.PORT || ChatService.PORT;
        
        this._app.use(cors(options));
        this.server = createServer(this._app);
        this.io = new SocketIOServer(this.server);
    }

    

    async listen (): Promise<void> {
        await this.server.listen(this.port);
        console.log(`Server running on port: ${this.port}. `);

        await this.io.on(ChatEvent.CONNECT, async (socket) => {
            console.log(`Client connected on port: ${this.port}`);

            await socket.on(ChatEvent.MESSAGE, async (message: Message) => {
                await this.io.emit('message', message)
            });

            await socket.on(ChatEvent.DISCONNECT, async () => {
                console.log('Client disconnected.')
            })

        });
    }

    get app(): express.Application {
        return this._app;
    }

}