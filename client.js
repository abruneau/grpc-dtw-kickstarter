const PROTO_PATH = __dirname + '/helloworld.proto';
const grpc = require('grpc');
const hello_proto = grpc.load(PROTO_PATH).helloworld;


const client = new hello_proto.Greeter(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

let user;

if (process.argv.length >= 3) {
    user = process.argv[2];
} else {
    user = 'World';
}

client.sayHello({ name: user }, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Greeting:', response.message);
    }
});
