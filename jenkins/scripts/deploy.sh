#!/bin/bash

# Navigate to the 'docker' folder inside the repository
cd /var/jenkins_home/workspace/DETECTAI/docker

# Check if docker-compose.yml exists
if [ ! -f docker-compose.yml ]; then
  echo "docker-compose.yml not found in the expected directory."
  exit 1
fi

# Shut down any running containers
docker-compose down

# Start the containers in detached mode

docker-compose up -d

