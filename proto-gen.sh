# npm proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto

# mkdir -p ./src/proto
# protoc -I=. ./proto/*.proto \
#   --js_out=import_style=commonjs:./src \
#   --grpc-web_out=import_style=typescript,mode=grpcwebtext:./client/src
protoc -I=./proto \
  --js_out=import_style=commonjs,binary:generated \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:generated \
  server_def.proto