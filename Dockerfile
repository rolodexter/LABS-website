# Use Node.js 20 Alpine as base image
FROM docker.io/library/node:20-alpine

# Install git and other necessary tools
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (including dev) to support build scripts
RUN npm ci

# Copy the rest of the application code
COPY . .

# Run pre-build type checks and build
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]