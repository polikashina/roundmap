# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine as production

RUN mkdir /app
WORKDIR /app

# Copy package files and install production dependencies plus tsx
COPY package*.json ./
RUN npm ci --omit=dev
RUN npm install tsx

# Copy built files and necessary source files
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src/utils ./src/utils
COPY --from=build /app/tsconfig.json ./tsconfig.json

# Expose the port the app runs on
EXPOSE 3000

# Command to run the TypeScript server directly with tsx
CMD ["npx", "tsx", "server/index.ts"]
