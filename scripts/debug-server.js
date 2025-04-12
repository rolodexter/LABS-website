// Debug script to help identify startup issues
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== rolodexterLABS Server Debug Script ===');
console.log(`Current working directory: ${process.cwd()}`);
console.log(`Node version: ${process.version}`);
console.log(`Date: ${new Date().toISOString()}`);
console.log('\n');

// Check for required files
const requiredFiles = [
  'next.config.js',
  'package.json',
  'server.js',
  'pages/index.tsx',
  'pages/_app.tsx'
];

console.log('Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`- ${file}: ${exists ? '✅ Found' : '❌ Missing'}`);
});
console.log('\n');

// Check environment variables
console.log('Checking environment variables:');
const envVars = [
  'NODE_ENV',
  'DATABASE_URL',
  'NEXT_PUBLIC_SITE_URL'
];

envVars.forEach(envVar => {
  console.log(`- ${envVar}: ${process.env[envVar] ? '✅ Set' : '❌ Missing'}`);
});
console.log('\n');

// Try Next.js compilation check
console.log('Checking Next.js compilation:');
try {
  execSync('npx next build --no-lint', { stdio: 'pipe' });
  console.log('- Next.js build: ✅ Successful');
} catch (error) {
  console.log('- Next.js build: ❌ Failed');
  console.log('- Error message:', error.message.split('\n')[0]);
}
console.log('\n');

console.log('Debug complete! Check the logs above for potential issues.');