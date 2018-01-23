Kickstarter app for gRPC server app with typescript and webpack in Docker
=====================

## PREREQUISITES
You need to have docker installed on your machine and runing.

To run the client you'll need `nodejs`

## INSTALLATION

Start by cloning the repository

```
git clone https://github.com/abruneau/grpc-dtw-kickstarter.git
```

You can now run the server in Docker
```
docker-compose up --build
```

The server use webpack to watch for changes on your local machine, recompile, and restart the server

---------------------------

To run the client, install dependencies

```
cd client
yarn
```

and start the client
```
yarn start
```
