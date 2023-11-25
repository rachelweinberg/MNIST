const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_FILE = "./proto/server_def.proto";
const fs = require('fs');
const csv = require('csv-parser');

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
    getData()
      .then((images) => {
        console.log(`getImage: call started, streaming ${images.length} images`);
        images.forEach((image) => {
          call.write(image);
        });
        call.end();
        console.log('getImage: call ended');
      })
      .catch((error) => {
        console.error('Error in getData:', error.message);
        call.emit('error', {
          code: grpc.status.INTERNAL,
          details: error.message,
        });
      });
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

    const stream = fs.createReadStream('./mnist_test.csv');

    stream
      .on('error', (error) => {
        reject(error); // Handle file read error
      })
      .pipe(csv())
      .on('data', (row) => {
        try {
          const label = row.label;
          const pixels = Object.values(row).slice(1).map(Number);
          dataByIndex.push({ label, pixels });
        } catch (error) {
          // Handle row processing error
          reject(error);
        }
      })
      .on('end', () => {
        resolve(dataByIndex);
      })
      .on('error', (error) => {
        reject(error); // Handle CSV parsing error
      });
  });
};

