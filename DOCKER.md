# 🐳 Docker Deployment Guide

## Quick Start Commands

### Development Mode (with Hot Reload)

```bash
# Start development environment
docker-compose -f docker-compose.dev.yaml up

# Start in background
docker-compose -f docker-compose.dev.yaml up -d

# View logs
docker-compose -f docker-compose.dev.yaml logs -f

# Stop
docker-compose -f docker-compose.dev.yaml down
```

Access at: http://localhost:5173

### Production Mode

```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

Access at: http://localhost:3000

## Manual Docker Commands

### Build Images

```bash
# Build production image
docker build -t voyage-tracking:latest .

# Build development image
docker build -f Dockerfile.dev -t voyage-tracking:dev .
```

### Run Containers

```bash
# Run production container
docker run -d -p 3000:80 --name voyage-app voyage-tracking:latest

# Run development container with volume
docker run -d -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --name voyage-app-dev \
  voyage-tracking:dev
```

### Container Management

```bash
# List running containers
docker ps

# Stop container
docker stop voyage-app

# Remove container
docker rm voyage-app

# View logs
docker logs -f voyage-app

# Execute command in container
docker exec -it voyage-app sh
```

## Environment Variables

Create a `.env` file or pass environment variables:

```bash
# Using .env file
docker run --env-file .env -p 3000:80 voyage-tracking:latest

# Using -e flag
docker run -e VITE_API_BASE_URL=http://api.example.com \
           -e VITE_API_KEY=your-key \
           -p 3000:80 voyage-tracking:latest
```

## Docker Compose with Backend

If you want to run both frontend and backend together, uncomment the backend service in `docker-compose.yaml`:

```yaml
services:
  voyage-frontend:
    # ... frontend config

  voyage-backend:
    image: your-backend-image:latest
    container_name: voyage-tracking-backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=your-database-url
    restart: unless-stopped
    networks:
      - voyage-network
```

Then update frontend environment:

```yaml
voyage-frontend:
  environment:
    - VITE_API_BASE_URL=http://voyage-backend:8080
    - VITE_API_KEY=your-api-key
```

## Troubleshooting

### Build fails with TypeScript errors

```bash
# Clean and rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Port already in use

```bash
# Check what's using the port
lsof -i :3000

# Kill the process or change port in docker-compose.yaml
ports:
  - "3001:80"  # Use different port
```

### Container won't start

```bash
# Check logs
docker logs voyage-tracking-frontend

# Check container status
docker ps -a

# Inspect container
docker inspect voyage-tracking-frontend
```

### Volume permission issues (Development)

```bash
# Fix permissions
sudo chown -R $USER:$USER .

# Or run with user flag
docker run --user $(id -u):$(id -g) ...
```

## Production Optimization

### Multi-stage Build Benefits

- **Smaller image size**: Only includes Nginx and built files
- **Faster deployment**: Less data to transfer
- **More secure**: No build tools in production image

### Nginx Configuration

The `nginx.conf` includes:

- ✅ Gzip compression
- ✅ Security headers
- ✅ Client-side routing support
- ✅ Static asset caching
- ✅ No-cache for index.html

### Health Check

Add health check to docker-compose.yaml:

```yaml
voyage-frontend:
  healthcheck:
    test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t voyage-tracking:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          docker tag voyage-tracking:${{ github.sha }} registry.example.com/voyage-tracking:latest
          docker push registry.example.com/voyage-tracking:latest
```

## Useful Commands

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# See disk usage
docker system df

# Clean everything
docker system prune -a --volumes
```
