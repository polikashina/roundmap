# RoundMap

## Containerization and Deployment

This project is containerized using Docker and can be deployed using GitHub Actions CI/CD.

### Local Development with Docker

#### Prerequisites

- Docker
- Docker Compose

#### Development Mode

To run the application in development mode with hot-reloading:

```bash
docker-compose up dev
```

This will start the application in development mode on http://localhost:3000.

#### Production Mode

To build and run the application in production mode:

```bash
docker-compose up prod
```

This will build the application and start it in production mode on http://localhost:3000.

### Building Docker Images Manually

#### Development Image

```bash
docker build -t roundmap:dev -f Dockerfile.dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules roundmap:dev
```

#### Production Image

```bash
docker build -t roundmap:latest .
docker run -p 3000:3000 roundmap:latest
```

### CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/deploy.yml`.

#### How it works

1. When you push to the `main` branch, GitHub Actions will:
   - Build the Docker image
   - Push it to GitHub Container Registry (ghcr.io)
   - Deploy it to your production environment (if configured)

#### Setting up deployment to a self-hosted server

To complete the deployment setup:

1. Add the following secrets to your GitHub repository:

   - `SERVER_HOST`: The hostname or IP address of your server
   - `SERVER_USERNAME`: The SSH username for your server
   - `SERVER_SSH_KEY`: The private SSH key for authentication

2. Ensure Docker is installed on your server and the user has permissions to run Docker commands

3. The GitHub Actions workflow will:
   - Build the Docker image
   - Push it to GitHub Container Registry (ghcr.io)
   - SSH into your server
   - Pull the latest image
   - Stop and remove any existing container
   - Start a new container with the latest image

#### Accessing the deployed application

Once deployed, the application will be available at your configured domain or IP address.
