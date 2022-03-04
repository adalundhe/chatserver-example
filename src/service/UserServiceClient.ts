import { v4 as uuidv4 } from "uuid";
import { UsersClient, ChatUser, ChatUserName } from "../proto";
import * as grpc from '@grpc/grpc-js';
import { User } from "../types/user";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";


export class UserServiceClient {

    private static readonly USER_SERVICE_PORT = 5050;
    private client: UsersClient;

    constructor(){
        const userServicePort = process.env.USER_SERVICE_PORT ?? UserServiceClient.USER_SERVICE_PORT;
        const userServiceIp = process.env.USER_SERVICE_IP ?? 'localhost';

        this.client = new UsersClient(
            `${userServiceIp}:${userServicePort}`,
            grpc.credentials.createInsecure()
        );
    }

    getUser = async ({ userName, callback }: {userName: string, callback(user: User): Promise<void>}) => {
        const selectedUserName = await this._createGRPCUserName({ userName });
        const stream = await this.client.getUser();

        stream.on('data', async (chatUser: ChatUser) => {
            const user = await chatUser.toObject();
            await callback({
                id: user.id,
                name: user.name,
                tokens: user.tokensList
            });
        });

        await stream.write(selectedUserName);
    }

    createOrUpdateUser = async ({ user, callback }: {user: User, callback(userName: string): Promise<void>}) => {
        
        const newUser = await this._createGRPCUser({ user });
        const stream = await this.client.createOrUpdateUser();
        
        stream.on('data', async (chatUserName: ChatUserName) => {
            const userName = await chatUserName.toObject();
            await callback(userName.name);
        })

        await stream.write(newUser);
        

    }

    deleteUser = async ({ userName, callback }: {userName: string, callback(): Promise<void>}) => {
        const selectedUserName = await this._createGRPCUserName({ userName });
        const stream = await this.client.deleteUser();
        
        stream.on('data', async (_empty: Empty) => {
            await callback();
        })

        await stream.write(selectedUserName);
    }

    private _createGRPCUser = async ({ user }: {user: User}) => {

        const newUser = new ChatUser();
        newUser.setId(uuidv4());
        newUser.setName(user.name);
        newUser.setTokensList(user.tokens);

        return newUser;
    }

    private _createGRPCUserName = async ({ userName }: {userName: string}) => {
        const chatUserName = new ChatUserName();
        chatUserName.setName(userName);

        return chatUserName;
    }

}