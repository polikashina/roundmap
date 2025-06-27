# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application and server
RUN npm run build
RUN npm run build:server:prod

# Production stage
FROM node:20-alpine as production

RUN mkdir /app
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-server ./dist-server

# Expose the port the app runs on
EXPOSE 3000

# Command to run the compiled server
CMD ["node", "dist-server/index.cjs"]
