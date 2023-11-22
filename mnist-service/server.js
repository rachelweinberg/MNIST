const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_FILE = "./proto/server_def.proto";
const fs = require('fs');
const csv = require('csv-parser');

const dataByIndex = [];
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
const mnistProto = grpc.loadPackageDefinition(pkgDefs);
const server = new grpc.Server();

server.addService(mnistProto.MnistService.service, {
    getImage: async (call) => {
        try {
          getData().then((images) => {
            images.forEach((image) => {
              call.write(image);
          });
      
          call.end();
          });
        } catch (error) {
            call(error, null);
        }
    }
});

server.bindAsync(
    "127.0.0.1:5000",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log(`listening on port ${port}`);
      server.start();
    }
  );


  const getData = () => {
    return new Promise((resolve, reject) => {
      const dataByIndex = [];
  
      fs.createReadStream('./mnist_test.csv')
        .pipe(csv())
        .on('data', (row) => {
          const label = row.label;
          const pixels = Object.values(row).slice(1).map(Number);
          dataByIndex.push({ label, pixels });
        })
        .on('end', () => {  
          resolve(dataByIndex);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };
  
