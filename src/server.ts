const PROTO_PATH = "./helloworld.proto";
import * as grpc from "grpc";
const helloProto = grpc.load(PROTO_PATH).helloworld;

const sayHello = (call: any, callback: any) => {
 console.info("Calling method [sayHello]");
 callback(null, { message: "Hello " + call.request.name });
};

const server = new grpc.Server();

server.addService(helloProto.Greeter.service, { sayHello });
server.bind(`0.0.0.0:${process.env.SERVER_PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.info("GRPC server started at port", process.env.SERVER_PORT);
