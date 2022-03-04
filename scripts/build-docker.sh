DOCKERFILE_PATH=${DOCKERFILE_PATH:-"./"}

docker build -t chat-sockets-server:latest \
 --no-cache \
 --target=run \
  ${DOCKERFILE_PATH}