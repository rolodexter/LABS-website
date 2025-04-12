const fs = require('fs');
const path = require('path');
const os = require('os');

// Comprehensive error logging function
function logErrorDetails(error) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      pid: process.pid
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT || 3000
    },
    processInfo: {
      argv: process.argv,
      execPath: process.execPath,
      memoryUsage: process.memoryUsage()
    }
  };

  // Safely log environment variables, excluding sensitive ones
  const safeEnvVars = {};
  Object.keys(process.env)
    .filter(key => 
      !key.toLowerCase().includes('secret') && 
      !key.toLowerCase().includes('password') && 
      !key.toLowerCase().includes('token')
    )
    .forEach(key => {
      safeEnvVars[key] = process.env[key];
    });
  
  errorLog.safeEnvironmentVars = safeEnvVars;

  const logPath = path.join('/app', 'comprehensive-error-log.json');
  
  try {
    fs.writeFileSync(logPath, JSON.stringify(errorLog, null, 2));
    console.error('Comprehensive Error Log:', JSON.stringify(errorLog, null, 2));
  } catch (writeError) {
    console.error('Failed to write comprehensive error log:', writeError);
  }
}

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  logErrorDetails(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  const error = reason instanceof Error 
    ? reason 
    : new Error(`Unhandled rejection: ${JSON.stringify(reason)}`);
  logErrorDetails(error);
  process.exit(1);
});

// Validate critical environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  // Add other critical environment variables here
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    const missingEnvError = new Error(`Missing required environment variable: ${varName}`);
    logErrorDetails(missingEnvError);
    throw missingEnvError;
  }
});

// Attempt to start the Next.js server with additional error handling
try {
  const next = require('next/dist/server/next');
  const dev = process.env.NODE_ENV !== 'production';
  const hostname = process.env.HOSTNAME || 'localhost';
  const port = parseInt(process.env.PORT || '3000', 10);

  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const { createServer } = require('http');
    const server = createServer((req, res) => {
      try {
        handle(req, res);
      } catch (handleError) {
        console.error('Request handling error:', handleError);
        logErrorDetails(handleError);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.listen(port, hostname, (err) => {
      if (err) {
        logErrorDetails(err);
        throw err;
      }
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  }).catch((prepareError) => {
    console.error('Failed to prepare Next.js app:', prepareError);
    logErrorDetails(prepareError);
    process.exit(1);
  });
} catch (startupError) {
  console.error('Failed to start server:', startupError);
  logErrorDetails(startupError);
  process.exit(1);
}
