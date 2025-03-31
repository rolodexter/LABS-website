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

// Next.js app configuration
const app = next({
  dev,
  dir: __dirname, // Specify the root directory
  hostname,
  port: PORT
});

const handle = app.getRequestHandler();

// Make sure the logos directory exists
const logosDir = path.join(__dirname, 'logos');
if (!fs.existsSync(logosDir)) {
  console.warn(`Warning: Logos directory not found at ${logosDir}`);
}

// Define the supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];

app.prepare().then(() => {
  const server = express();

  // Improved logging middleware
  server.use((req, res, next) => {
    console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
    next();
  });

  // Serve static files from the public directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Serve logo files directly without Next.js image optimization
  server.use('/logos', (req, res, next) => {
    const filePath = path.join(logosDir, req.path);
    const ext = path.extname(filePath).toLowerCase();
    
    // Only serve image files
    if (IMAGE_EXTENSIONS.includes(ext) && fs.existsSync(filePath)) {
      console.log(`Serving logo file directly: ${filePath}`);
      res.sendFile(filePath);
    } else {
      console.log(`Logo file not found or not an image: ${filePath}`);
      next();
    }
  });

  // Explicitly handle logo files requested at the root level
  IMAGE_EXTENSIONS.forEach(ext => {
    server.get(`/inline_black${ext}`, (req, res) => {
      res.sendFile(path.join(logosDir, `inline_black${ext}`));
    });
    
    server.get(`/inline-black${ext}`, (req, res) => {
      res.sendFile(path.join(logosDir, `inline_black${ext}`));
    });
  });

  // Let Next.js handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(PORT, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${PORT}`);
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log(`> Working directory: ${__dirname}`);
    
    // List files in the logos directory
    if (fs.existsSync(logosDir)) {
      console.log('> Available logo files:');
      fs.readdirSync(logosDir).forEach(file => {
        console.log(`  - ${file}`);
      });
    }
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});