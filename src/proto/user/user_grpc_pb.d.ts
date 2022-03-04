// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as user_pb from "./user_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUser: IUsersService_IGetUser;
    createOrUpdateUser: IUsersService_ICreateOrUpdateUser;
    deleteUser: IUsersService_IDeleteUser;
}

interface IUsersService_IGetUser extends grpc.MethodDefinition<user_pb.UserName, user_pb.User> {
    path: "/user.Users/GetUser";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<user_pb.UserName>;
    requestDeserialize: grpc.deserialize<user_pb.UserName>;
    responseSerialize: grpc.serialize<user_pb.User>;
    responseDeserialize: grpc.deserialize<user_pb.User>;
}
interface IUsersService_ICreateOrUpdateUser extends grpc.MethodDefinition<user_pb.User, user_pb.UserName> {
    path: "/user.Users/CreateOrUpdateUser";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<user_pb.User>;
    requestDeserialize: grpc.deserialize<user_pb.User>;
    responseSerialize: grpc.serialize<user_pb.UserName>;
    responseDeserialize: grpc.deserialize<user_pb.UserName>;
}
interface IUsersService_IDeleteUser extends grpc.MethodDefinition<user_pb.UserName, google_protobuf_empty_pb.Empty> {
    path: "/user.Users/DeleteUser";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<user_pb.UserName>;
    requestDeserialize: grpc.deserialize<user_pb.UserName>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const UsersService: IUsersService;

export interface IUsersServer extends grpc.UntypedServiceImplementation {
    getUser: grpc.handleBidiStreamingCall<user_pb.UserName, user_pb.User>;
    createOrUpdateUser: grpc.handleBidiStreamingCall<user_pb.User, user_pb.UserName>;
    deleteUser: grpc.handleBidiStreamingCall<user_pb.UserName, google_protobuf_empty_pb.Empty>;
}

export interface IUsersClient {
    getUser(): grpc.ClientDuplexStream<user_pb.UserName, user_pb.User>;
    getUser(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, user_pb.User>;
    getUser(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, user_pb.User>;
    createOrUpdateUser(): grpc.ClientDuplexStream<user_pb.User, user_pb.UserName>;
    createOrUpdateUser(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.User, user_pb.UserName>;
    createOrUpdateUser(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.User, user_pb.UserName>;
    deleteUser(): grpc.ClientDuplexStream<user_pb.UserName, google_protobuf_empty_pb.Empty>;
    deleteUser(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, google_protobuf_empty_pb.Empty>;
    deleteUser(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, google_protobuf_empty_pb.Empty>;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getUser(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, user_pb.User>;
    public getUser(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, user_pb.User>;
    public createOrUpdateUser(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.User, user_pb.UserName>;
    public createOrUpdateUser(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.User, user_pb.UserName>;
    public deleteUser(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, google_protobuf_empty_pb.Empty>;
    public deleteUser(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<user_pb.UserName, google_protobuf_empty_pb.Empty>;
}
