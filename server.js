const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Let Next.js handle all routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Listen on all network interfaces (0.0.0.0) instead of just localhost
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log(`> NODE_ENV: ${process.env.NODE_ENV}`);
  });
});