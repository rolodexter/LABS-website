const express = require('express');
const path = require('path');
const next = require('next');

// Determine if we're in development or production
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Load environment variables
require('dotenv').config();
if (dev) {
  require('dotenv').config({ path: '.env.local' });
}

const PORT = process.env.PORT || 3000;

// Prepare and start the server
nextApp.prepare().then(() => {
  const app = express();

  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Serve CSS files from the css directory for backward compatibility
  app.use('/css', express.static(path.join(__dirname, 'css')));
  
  // Handle API routes
  app.all('/api/*', (req, res) => {
    return handle(req, res);
  });

  // Serve the landing page for the root route
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // Let Next.js handle all other routes
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`rolodexterLABS website is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});