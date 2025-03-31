const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Environment configuration
const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0'; // Listen on all interfaces
const PORT = process.env.PORT || 3000;

console.log(`Starting server in ${dev ? 'development' : 'production'} mode`);
console.log(`PORT environment variable: ${process.env.PORT}`);
console.log(`RAILWAY_STATIC_URL: ${process.env.RAILWAY_STATIC_URL || 'not set'}`);

// Next.js app configuration
const app = next({
  dev,
  dir: __dirname,
  hostname,
  port: PORT
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Basic request logging
  server.use((req, res, next) => {
    console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
    next();
  });

  // Health check endpoint for Railway
  server.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      uptime: process.uptime()
    });
  });

  // Serve static files from the public directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Error handling middleware
  server.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  // Start the server
  server.listen(PORT, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Working directory: ${__dirname}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});