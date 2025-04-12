const fs = require('fs');
const path = require('path');

// Global error handler
process.on('uncaughtException', (error) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    env: process.env
  };

  const logPath = path.join('/app', 'runtime-error-log.json');
  
  try {
    fs.writeFileSync(logPath, JSON.stringify(errorLog, null, 2));
    console.error('Uncaught Exception logged:', errorLog);
  } catch (writeError) {
    console.error('Failed to write error log:', writeError);
  }

  // Ensure the process exits with an error code
  process.exit(1);
});

// Attempt to load and validate critical environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  // Add other critical environment variables here
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Proceed with normal application startup
require('next/dist/bin/next');
