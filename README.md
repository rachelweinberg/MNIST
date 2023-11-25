# MNIST

## Dockerized environment:

RUN `docker-compose up -d --build`

## Local

### Server
* RUN `cd mnist-service`
* RUN `cp ../proto ./proto`
* RUN `npm install`
* RUN `node server.js`

### Envoy Proxy
* RUN `docker-compose up --build envoy`

### Client
*  generate proto files: 
    * RUN `npm install -g grpc-tools`
    * RUN ```curl -LO https://github.com/grpc/grpc-web/releases/download/1.3.0/protoc-gen-grpc-web-1.3.0-darwin-x86_64 && mv protoc-gen-grpc-web-1.3.0-darwin-x86_64 /usr/local/bin/protoc-gen-grpc-web && chmod +x /usr/local/bin/protoc-gen-grpc-web```
    * RUN `mkdir -p ./mnist-client/src/proto`
    * RUN ```npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./mnist-client/src --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./mnist-client/src ./proto/server_def.proto```
* RUN `cd mnist-client`
* RUN `npm install`
* RUN `npm start`