# Use Node.js 20 Alpine as base image
FROM docker.io/library/node:20-alpine

# Install git and other necessary tools
RUN apk add --no-cache git curl

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Verify package files exist
RUN ls -l package*.json

# Install ALL dependencies (including dev) to support build scripts
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Verify files are copied correctly
RUN ls -la

# Print Node and npm versions for debugging
RUN node --version && npm --version

# Run pre-build type checks and build
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]