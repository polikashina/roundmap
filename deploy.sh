#!/bin/bash
set -e

# Configuration
REGISTRY="ghcr.io"
REPO_NAME=$(basename $(git rev-parse --show-toplevel))
GITHUB_USERNAME=$(git config --get remote.origin.url | sed -n 's/.*github.com[:/]\([^/]*\).*/\1/p')
IMAGE_NAME="$REGISTRY/$GITHUB_USERNAME/$REPO_NAME"
SERVER_HOST=${{ secrets.SSH_HOST}}
SERVER_USER=${{ secrets.SSH_USER}}
CONTAINER_NAME="roundmap-app"

# Build and push the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:latest -f dockerfile .

echo "Pushing Docker image to $REGISTRY..."
# Check if already logged in to GitHub Container Registry
if ! docker info | grep -q "ghcr.io"; then
  echo "You need to login to GitHub Container Registry first."
  echo "Run: echo \$GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin"
  echo "Where GITHUB_TOKEN is your GitHub Personal Access Token with 'read:packages' and 'write:packages' scopes."
  read -p "Do you want to continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

docker push $IMAGE_NAME:latest

# Check SSH connection to server
echo "Checking SSH connection to $SERVER_HOST..."
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 $SERVER_USER@$SERVER_HOST exit &>/dev/null; then
  echo "Cannot connect to server $SERVER_HOST as $SERVER_USER."
  echo "Make sure your SSH key is set up correctly and added to the server."
  echo "You may need to run: ssh-copy-id $SERVER_USER@$SERVER_HOST"
  read -p "Do you want to continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Deploy to server
echo "Deploying to server $SERVER_HOST..."
ssh $SERVER_USER@$SERVER_HOST << EOF
  # Login to GitHub Container Registry (if needed)
  # You may need to provide your GitHub token here or have it configured on the server
  # echo "\$GITHUB_TOKEN" | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
  
  # Pull the latest image
  docker pull $IMAGE_NAME:latest
  
  # Stop and remove existing container if it exists
  docker stop $CONTAINER_NAME 2>/dev/null || true
  docker rm $CONTAINER_NAME 2>/dev/null || true
  
  # Run the new container
  docker run -d \\
    --name $CONTAINER_NAME \\
    -p 3000:3000 \\
    -e NODE_ENV=production \\
    --restart unless-stopped \\
    $IMAGE_NAME:latest
  
  # Clean up old images
  docker image prune -af
EOF

echo "Deployment completed successfully!"
