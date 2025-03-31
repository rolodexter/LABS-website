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
  dir: __dirname, // Specify the root directory
  hostname,
  port: PORT,
  conf: {
    distDir: '.next',
    compress: true
  }
});

const handle = app.getRequestHandler();

// Make sure the logos directory exists
const logosDir = path.join(__dirname, 'logos');
if (!fs.existsSync(logosDir)) {
  console.warn(`Warning: Logos directory not found at ${logosDir}`);
  // Create the logos directory if it doesn't exist
  try {
    fs.mkdirSync(logosDir, { recursive: true });
    console.log(`Created logos directory at ${logosDir}`);
    
    // In production, we might need to copy logo files from another location
    if (process.env.NODE_ENV === 'production') {
      console.log('Running in production, checking for logos in static directories');
      
      // Possible locations where logo files might be found in production
      const possibleLogoLocations = [
        path.join(__dirname, 'public', 'logos'),
        path.join(__dirname, '.next', 'static', 'logos'),
        path.join(__dirname, '.next', 'static', 'images', 'logos'),
        path.join(__dirname, '.next', 'standalone', 'logos')
      ];
      
      // Check each possible location
      possibleLogoLocations.forEach(location => {
        if (fs.existsSync(location)) {
          console.log(`Found logos in ${location}, copying to ${logosDir}`);
          try {
            const files = fs.readdirSync(location);
            files.forEach(file => {
              const src = path.join(location, file);
              const dest = path.join(logosDir, file);
              fs.copyFileSync(src, dest);
              console.log(`Copied ${file} to logos directory`);
            });
          } catch (err) {
            console.error(`Error copying logo files: ${err.message}`);
          }
        }
      });
    }
  } catch (err) {
    console.error(`Failed to create logos directory: ${err.message}`);
  }
}

// Define the supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];

// Create a map of logo file names for quick lookup
const logoFiles = {};

// Define logo file variations to handle different naming conventions
const logoVariations = {
  'inline_black.png': ['inline-black.png', 'inline_black.png'],
  'inline-white.png': ['inline_white.png', 'inline-white.png'],
  'logotype-black.png': ['logotype_black.png', 'logotype-black.png'],
  'logotype-white.png': ['logotype_white.png', 'logotype-white.png'],
  'symbol-black.png': ['symbol_black.png', 'symbol-black.png'],
  'symbol-white.png': ['symbol_white.png', 'symbol-white.png']
};

app.prepare().then(() => {
  const server = express();

  // Improved logging middleware
  server.use((req, res, next) => {
    console.log(`${new Date().toISOString()} [${req.method}] ${req.url}`);
    next();
  });

  // Explicitly handle the root route first - ensure Next.js handles it
  server.get('/', (req, res) => {
    console.log('Root path requested, handling with Next.js');
    return handle(req, res);
  });

  // Serve static files from the public directory, but exclude index.html
  server.use(express.static(path.join(__dirname, 'public'), {
    index: false // Prevent serving index.html for directory requests
  }));

  // Serve logos directory directly
  server.use('/logos', express.static(path.join(__dirname, 'logos')));

  // Populate the logo files map
  if (fs.existsSync(logosDir)) {
    const files = fs.readdirSync(logosDir);
    files.forEach(file => {
      logoFiles[file.toLowerCase()] = file;
      console.log(`Registered logo file: ${file}`);
    });
  }
  
  // Special handler for logo files - handle both underscore and hyphen variants
  server.use('/logos', (req, res, next) => {
    // Get the requested filename from the URL
    const requestedFile = path.basename(req.path);
    
    // Check if we have this file or any variations of it
    let realFileName = logoFiles[requestedFile.toLowerCase()];
    
    if (!realFileName) {
      // Try to find a variation
      for (const [original, variations] of Object.entries(logoVariations)) {
        if (variations.includes(requestedFile)) {
          realFileName = logoFiles[original.toLowerCase()];
          break;
        }
      }
    }
    
    if (realFileName) {
      const filePath = path.join(logosDir, realFileName);
      console.log(`Serving logo file: ${filePath} (requested as ${requestedFile})`);
      res.sendFile(filePath);
    } else {
      console.log(`Logo file not found: ${requestedFile}`);
      next();
    }
  });

  // Handle direct root path logo requests for common variations
  Object.entries(logoVariations).forEach(([original, variations]) => {
    variations.forEach(variant => {
      server.get(`/${variant}`, (req, res) => {
        if (logoFiles[original.toLowerCase()]) {
          const filePath = path.join(logosDir, logoFiles[original.toLowerCase()]);
          console.log(`Serving root logo file: ${filePath}`);
          res.sendFile(filePath);
        } else {
          res.status(404).send(`Logo file not found: ${variant}`);
        }
      });
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
    
    // List all available logo files
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