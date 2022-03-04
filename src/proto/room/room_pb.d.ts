// package: user
// file: room.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class RoomName extends jspb.Message { 
    getName(): string;
    setName(value: string): RoomName;

    hasToken(): boolean;
    clearToken(): void;
    getToken(): string | undefined;
    setToken(value: string): RoomName;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RoomName.AsObject;
    static toObject(includeInstance: boolean, msg: RoomName): RoomName.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RoomName, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RoomName;
    static deserializeBinaryFromReader(message: RoomName, reader: jspb.BinaryReader): RoomName;
}

export namespace RoomName {
    export type AsObject = {
        name: string,
        token?: string,
    }
}

export class Room extends jspb.Message { 
    getId(): string;
    setId(value: string): Room;
    getName(): string;
    setName(value: string): Room;
    getToken(): string;
    setToken(value: string): Room;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Room.AsObject;
    static toObject(includeInstance: boolean, msg: Room): Room.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Room, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Room;
    static deserializeBinaryFromReader(message: Room, reader: jspb.BinaryReader): Room;
}

export namespace Room {
    export type AsObject = {
        id: string,
        name: string,
        token: string,
    }
}
