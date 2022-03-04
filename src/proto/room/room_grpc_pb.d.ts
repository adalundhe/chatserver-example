// package: user
// file: room.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as room_pb from "./room_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IRoomsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getRoom: IRoomsService_IGetRoom;
    createOrUpdateRoom: IRoomsService_ICreateOrUpdateRoom;
    deleteRoom: IRoomsService_IDeleteRoom;
}

interface IRoomsService_IGetRoom extends grpc.MethodDefinition<room_pb.RoomName, room_pb.Room> {
    path: "/user.Rooms/GetRoom";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<room_pb.RoomName>;
    requestDeserialize: grpc.deserialize<room_pb.RoomName>;
    responseSerialize: grpc.serialize<room_pb.Room>;
    responseDeserialize: grpc.deserialize<room_pb.Room>;
}
interface IRoomsService_ICreateOrUpdateRoom extends grpc.MethodDefinition<room_pb.Room, room_pb.RoomName> {
    path: "/user.Rooms/CreateOrUpdateRoom";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<room_pb.Room>;
    requestDeserialize: grpc.deserialize<room_pb.Room>;
    responseSerialize: grpc.serialize<room_pb.RoomName>;
    responseDeserialize: grpc.deserialize<room_pb.RoomName>;
}
interface IRoomsService_IDeleteRoom extends grpc.MethodDefinition<room_pb.RoomName, google_protobuf_empty_pb.Empty> {
    path: "/user.Rooms/DeleteRoom";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<room_pb.RoomName>;
    requestDeserialize: grpc.deserialize<room_pb.RoomName>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}

export const RoomsService: IRoomsService;

export interface IRoomsServer extends grpc.UntypedServiceImplementation {
    getRoom: grpc.handleBidiStreamingCall<room_pb.RoomName, room_pb.Room>;
    createOrUpdateRoom: grpc.handleBidiStreamingCall<room_pb.Room, room_pb.RoomName>;
    deleteRoom: grpc.handleBidiStreamingCall<room_pb.RoomName, google_protobuf_empty_pb.Empty>;
}

export interface IRoomsClient {
    getRoom(): grpc.ClientDuplexStream<room_pb.RoomName, room_pb.Room>;
    getRoom(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, room_pb.Room>;
    getRoom(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, room_pb.Room>;
    createOrUpdateRoom(): grpc.ClientDuplexStream<room_pb.Room, room_pb.RoomName>;
    createOrUpdateRoom(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.Room, room_pb.RoomName>;
    createOrUpdateRoom(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.Room, room_pb.RoomName>;
    deleteRoom(): grpc.ClientDuplexStream<room_pb.RoomName, google_protobuf_empty_pb.Empty>;
    deleteRoom(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, google_protobuf_empty_pb.Empty>;
    deleteRoom(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, google_protobuf_empty_pb.Empty>;
}

export class RoomsClient extends grpc.Client implements IRoomsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getRoom(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, room_pb.Room>;
    public getRoom(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, room_pb.Room>;
    public createOrUpdateRoom(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.Room, room_pb.RoomName>;
    public createOrUpdateRoom(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.Room, room_pb.RoomName>;
    public deleteRoom(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, google_protobuf_empty_pb.Empty>;
    public deleteRoom(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<room_pb.RoomName, google_protobuf_empty_pb.Empty>;
}
