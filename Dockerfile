# Stage 1: Build frontend and install dependencies
FROM node:18 AS build-frontend

# Set the working directory
WORKDIR /usr/src/app

# Copy root-level package.json and package-lock.json
COPY package*.json ./

# Install both server and client dependencies
RUN npm install

# Copy client and server directories
COPY client ./client
COPY server ./server

# Build the client application
RUN cd client && npm run build

# Stage 2: Setup backend and serve frontend
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy server files and built frontend assets
COPY --from=build-frontend /usr/src/app/server ./server
COPY --from=build-frontend /usr/src/app/client/dist ./client/dist

# Install only production dependencies for the server
WORKDIR /usr/src/app/server
COPY --from=build-frontend /usr/src/app/package*.json ./
RUN npm install --production

# Set production environment
ENV NODE_ENV=production

# Expose the server port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]