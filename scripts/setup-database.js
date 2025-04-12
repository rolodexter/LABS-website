/**
 * Database Setup Script
 * 
 * This script sets up the PostgreSQL database for the rolodexterLABS website.
 * It installs the necessary dependencies and initializes the database.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Log with color
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Execute a command and return its output
function execute(command) {
  try {
    log(`Executing: ${command}`, colors.cyan);
    const output = execSync(command, { stdio: 'inherit' });
    return { success: true, output };
  } catch (error) {
    log(`Error executing command: ${command}`, colors.red);
    log(error.message, colors.red);
    return { success: false, error };
  }
}

// Check if a package is installed
function isPackageInstalled(packageName) {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    return (
      (packageJson.dependencies && packageJson.dependencies[packageName]) ||
      (packageJson.devDependencies && packageJson.devDependencies[packageName])
    );
  } catch (error) {
    log(`Error checking if package ${packageName} is installed:`, colors.red);
    log(error.message, colors.red);
    return false;
  }
}

// Main setup function
async function setupDatabase() {
  log('Starting database setup for rolodexterLABS website...', colors.magenta);
  
  // Step 1: Install dependencies
  log('\n📦 Step 1: Installing dependencies...', colors.yellow);
  
  const dependencies = ['@prisma/client'];
  const devDependencies = ['prisma'];
  
  // Install production dependencies
  for (const dep of dependencies) {
    if (!isPackageInstalled(dep)) {
      log(`Installing ${dep}...`, colors.cyan);
      const result = execute(`npm install ${dep}`);
      if (!result.success) {
        log(`Failed to install ${dep}. Please install it manually.`, colors.red);
      }
    } else {
      log(`${dep} is already installed.`, colors.green);
    }
  }
  
  // Install development dependencies
  for (const dep of devDependencies) {
    if (!isPackageInstalled(dep)) {
      log(`Installing ${dep} as a dev dependency...`, colors.cyan);
      const result = execute(`npm install -D ${dep}`);
      if (!result.success) {
        log(`Failed to install ${dep}. Please install it manually.`, colors.red);
      }
    } else {
      log(`${dep} is already installed.`, colors.green);
    }
  }
  
  // Step 2: Generate Prisma client
  log('\n🔧 Step 2: Generating Prisma client...', colors.yellow);
  const generateResult = execute('npx prisma generate');
  
  if (!generateResult.success) {
    log('Failed to generate Prisma client. Please run "npx prisma generate" manually.', colors.red);
    return;
  }
  
  // Step 3: Check for DATABASE_URL environment variable
  log('\n🔍 Step 3: Checking for DATABASE_URL environment variable...', colors.yellow);
  
  if (!process.env.DATABASE_URL) {
    log('DATABASE_URL environment variable not found.', colors.yellow);
    log('You need to set up the DATABASE_URL environment variable in your .env file.', colors.yellow);
    log('Example for Railway PostgreSQL:', colors.cyan);
    log('DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"', colors.cyan);
    
    // Create .env file if it doesn't exist
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      log('Creating .env file...', colors.cyan);
      fs.writeFileSync(envPath, 'DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"\n');
      log('.env file created. Please update it with your actual Railway PostgreSQL connection string.', colors.green);
    } else {
      log('.env file already exists. Please make sure it contains the DATABASE_URL variable.', colors.yellow);
    }
  } else {
    log('DATABASE_URL environment variable found.', colors.green);
  }
  
  // Step 4: Create database migrations
  log('\n🚀 Step 4: Creating database migrations...', colors.yellow);
  log('This step will create a migration based on your Prisma schema.', colors.cyan);
  log('If you have already run migrations, you can skip this step.', colors.cyan);
  
  const migrationName = 'initial_migration';
  const migrationResult = execute(`npx prisma migrate dev --name ${migrationName}`);
  
  if (!migrationResult.success) {
    log('Failed to create database migrations.', colors.red);
    log('You may need to set up the DATABASE_URL environment variable or fix issues with your Prisma schema.', colors.red);
    return;
  }
  
  // Step 5: Verify database connection
  log('\n✅ Step 5: Verifying database connection...', colors.yellow);
  const verifyResult = execute('npx prisma db pull');
  
  if (!verifyResult.success) {
    log('Failed to verify database connection.', colors.red);
    log('Please check your DATABASE_URL and make sure your Railway PostgreSQL instance is running.', colors.red);
    return;
  }
  
  // Setup complete
  log('\n🎉 Database setup complete!', colors.green);
  log('Your rolodexterLABS website is now configured to use PostgreSQL on Railway.', colors.green);
  log('\nNext steps:', colors.magenta);
  log('1. Run "node scripts/migrate-to-database.js" to migrate your content to the database.', colors.cyan);
  log('2. Start your Next.js application with "npm run dev".', colors.cyan);
  log('3. Visit http://localhost:3000 to see your centralized content system in action.', colors.cyan);
}

// Run the setup
setupDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    log('An unexpected error occurred during setup:', colors.red);
    log(error.message, colors.red);
    process.exit(1);
  });
