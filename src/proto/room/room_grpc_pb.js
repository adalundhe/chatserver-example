// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var room_pb = require('./room_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Room(arg) {
  if (!(arg instanceof room_pb.Room)) {
    throw new Error('Expected argument of type user.Room');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Room(buffer_arg) {
  return room_pb.Room.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_RoomName(arg) {
  if (!(arg instanceof room_pb.RoomName)) {
    throw new Error('Expected argument of type user.RoomName');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_RoomName(buffer_arg) {
  return room_pb.RoomName.deserializeBinary(new Uint8Array(buffer_arg));
}


var RoomsService = exports.RoomsService = {
  getRoom: {
    path: '/user.Rooms/GetRoom',
    requestStream: true,
    responseStream: true,
    requestType: room_pb.RoomName,
    responseType: room_pb.Room,
    requestSerialize: serialize_user_RoomName,
    requestDeserialize: deserialize_user_RoomName,
    responseSerialize: serialize_user_Room,
    responseDeserialize: deserialize_user_Room,
  },
  createOrUpdateRoom: {
    path: '/user.Rooms/CreateOrUpdateRoom',
    requestStream: true,
    responseStream: true,
    requestType: room_pb.Room,
    responseType: room_pb.RoomName,
    requestSerialize: serialize_user_Room,
    requestDeserialize: deserialize_user_Room,
    responseSerialize: serialize_user_RoomName,
    responseDeserialize: deserialize_user_RoomName,
  },
  deleteRoom: {
    path: '/user.Rooms/DeleteRoom',
    requestStream: true,
    responseStream: true,
    requestType: room_pb.RoomName,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_user_RoomName,
    requestDeserialize: deserialize_user_RoomName,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.RoomsClient = grpc.makeGenericClientConstructor(RoomsService);
