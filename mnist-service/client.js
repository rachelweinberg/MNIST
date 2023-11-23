// Load up dependencies
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
// Path to proto file
const PROTO_FILE = "../proto/server_def.proto";

// Options needed for loading Proto file
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// Load Proto File
const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);
// Load Definition into gRPC
const MnistService = grpc.loadPackageDefinition(pkgDefs).MnistService;

// Create the Client
const client = new MnistService(
  "localhost:5000",
  grpc.credentials.createInsecure()
);

// make a call to GetDog
client.GetImage({}, (error, image) => {
  if (error) {
    console.log(error);
  } else {
    console.log(image);
  }
});