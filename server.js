const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const PORT = process.env.PORT || 3000;

// Configure Next.js with proper host and port settings
const app = next({ 
  dev,
  hostname,
  port: PORT,
  // This is important - tell Next.js to use the correct public hostname
  conf: {
    serverRuntimeConfig: {
      hostname: hostname,
      port: PORT
    },
    publicRuntimeConfig: {
      hostname: hostname,
      port: PORT
    }
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files from the public directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Explicitly serve logo files to prevent optimization issues
  server.use('/logos', express.static(path.join(__dirname, 'logos')));

  // Let Next.js handle all routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Listen on all network interfaces
  server.listen(PORT, hostname, () => {
    console.log(`> Ready on http://${hostname}:${PORT}`);
    console.log(`> NODE_ENV: ${process.env.NODE_ENV}`);
  });
});