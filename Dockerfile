FROM node:20-alpine

WORKDIR /app

# Install git for husky
RUN apk add --no-cache git

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Install dependencies and update package-lock.json
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]