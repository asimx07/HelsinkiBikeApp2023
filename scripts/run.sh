#!/bin/bash
echo "Running Run.sh script"
DELAY=10

docker-compose --file ../docker-compose.yml down
docker rm -f $(docker ps -a -q)
docker volume rm -f $(docker volume ls -q)

docker-compose --file ../docker-compose.yml up --build -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
#sleep $DELAY