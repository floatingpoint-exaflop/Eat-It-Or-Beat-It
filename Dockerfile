# Stage 1: Build frontend
FROM node:18 AS build-frontend

# Set the working directory
WORKDIR /usr/src/app

# Copy the root-level package.json files
COPY package*.json ./

# Install only the production dependencies (skip dev dependencies)
RUN npm install --production --legacy-peer-deps

# Copy client and server directories
COPY client ./client
COPY server ./server

# Build the client application
RUN cd client && npm run build

# Stage 2: Setup backend and serve frontend
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy server files and built frontend assets from the build-frontend stage
COPY --from=build-frontend /usr/src/app/server ./server
COPY --from=build-frontend /usr/src/app/client/dist ./client/dist

# Install only production server dependencies
WORKDIR /usr/src/app/server
RUN npm install --production

# Set production environment
ENV NODE_ENV=production

# Expose the server port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
