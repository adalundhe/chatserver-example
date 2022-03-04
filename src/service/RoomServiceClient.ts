import { v4 as uuidv4 } from "uuid";
import { RoomsClient, ChatRoom, ChatRoomName } from "../proto";
import * as grpc from '@grpc/grpc-js';
import { Room } from "../types/room";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";


export class RoomServiceClient {

    private static readonly ROOM_SERVICE_PORT = 5060;
    private client: RoomsClient;

    constructor() {
        const roomServicePort = process.env.ROOM_SERVICE_PORT ?? RoomServiceClient.ROOM_SERVICE_PORT;
        const roomServiceIp = process.env.ROOM_SERVICE_IP ?? 'localhost';

        this.client = new RoomsClient(
            `${roomServiceIp}:${roomServicePort}`,
            grpc.credentials.createInsecure()
        )
    }

    getRoom = async ({ roomName, token, callback }: {roomName: string, token: string, callback(room: Room): Promise<void>}) => {
        const selectedRoomName = await this._createGRPCRoomName({ roomName, token });
        const stream = await this.client.getRoom();

        stream.on('data', async (chatRoom: ChatRoom) => {
            const room = await chatRoom.toObject();
            await callback(room);
        })

        await stream.write(selectedRoomName);
    }

    createOrUpdateRoom = async ({ room, callback }: {room: Room, callback(roomName: string): Promise<void>}) => {
        const newRoom = await this._createGRPCRoom({ room });
        const stream = await this.client.createOrUpdateRoom();

        stream.on('data', async (chatRoomName: ChatRoomName) => {
            const roomName = await chatRoomName.toObject();
            await callback(roomName.name);
        });

        await stream.write(newRoom);
    }

    deleteRoom = async ({ roomName, token, callback }: {roomName: string, token: string, callback(): Promise<void>}) => {
        const selectedRoomName = await this._createGRPCRoomName({ roomName, token });
        const stream = await this.client.deleteRoom();

        stream.on('data', async (_empty: Empty) => {
            await callback();
        });

        await stream.write(selectedRoomName);
    }

    private _createGRPCRoom = async ({ room }: {room: Room}) => {

        const newRoom = new ChatRoom();
        newRoom.setId(uuidv4());
        newRoom.setName(room.name);
        newRoom.setToken(room.token);

        return newRoom;
    }

    private _createGRPCRoomName = async ({ roomName, token }: {roomName: string, token: string}) => {
        const chatRoomName = new ChatRoomName()
        chatRoomName.setName(roomName);
        chatRoomName.setToken(token);

        return chatRoomName;
        
    }
}
