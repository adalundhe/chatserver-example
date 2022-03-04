// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class UserName extends jspb.Message { 
    getName(): string;
    setName(value: string): UserName;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserName.AsObject;
    static toObject(includeInstance: boolean, msg: UserName): UserName.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserName, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserName;
    static deserializeBinaryFromReader(message: UserName, reader: jspb.BinaryReader): UserName;
}

export namespace UserName {
    export type AsObject = {
        name: string,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;
    getName(): string;
    setName(value: string): User;
    clearTokensList(): void;
    getTokensList(): Array<string>;
    setTokensList(value: Array<string>): User;
    addTokens(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        name: string,
        tokensList: Array<string>,
    }
}
