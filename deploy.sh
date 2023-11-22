# Build backend Docker image
# docker build --progress plain -t backend-image -f Dockerfile.backend .
# Run backend Docker container
# docker run -d -p 5000:5000 --name backend-container backend-image

# Build client Docker image
docker build --progress plain -t client-image -f Dockerfile.client .
# Run client Docker container
docker run -d -p 3000:3000 --name client-container client-image

# docker build --progress plain -t envoy-image -f Dockerfile.envoy .
# docker run -p 8080:8080 -p 9901:9901 -d --name envoy-container envoy-image