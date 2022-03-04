// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');
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

function serialize_user_User(arg) {
  if (!(arg instanceof user_pb.User)) {
    throw new Error('Expected argument of type user.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_User(buffer_arg) {
  return user_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserName(arg) {
  if (!(arg instanceof user_pb.UserName)) {
    throw new Error('Expected argument of type user.UserName');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserName(buffer_arg) {
  return user_pb.UserName.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  getUser: {
    path: '/user.Users/GetUser',
    requestStream: true,
    responseStream: true,
    requestType: user_pb.UserName,
    responseType: user_pb.User,
    requestSerialize: serialize_user_UserName,
    requestDeserialize: deserialize_user_UserName,
    responseSerialize: serialize_user_User,
    responseDeserialize: deserialize_user_User,
  },
  createOrUpdateUser: {
    path: '/user.Users/CreateOrUpdateUser',
    requestStream: true,
    responseStream: true,
    requestType: user_pb.User,
    responseType: user_pb.UserName,
    requestSerialize: serialize_user_User,
    requestDeserialize: deserialize_user_User,
    responseSerialize: serialize_user_UserName,
    responseDeserialize: deserialize_user_UserName,
  },
  deleteUser: {
    path: '/user.Users/DeleteUser',
    requestStream: true,
    responseStream: true,
    requestType: user_pb.UserName,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_user_UserName,
    requestDeserialize: deserialize_user_UserName,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
