/**
 * Database Reset Script
 * 
 * This script resets the PostgreSQL database for the rolodexterLABS website.
 * It drops all tables and recreates them based on the Prisma schema.
 * WARNING: This will delete all data in the database!
 */

const { execSync } = require('child_process');

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

// Main reset function
async function resetDatabase() {
  log('⚠️  WARNING: This script will reset your database and delete all data!', colors.red);
  log('Starting database reset for rolodexterLABS website...', colors.magenta);
  
  // Step 1: Reset the database
  log('\n🗑️  Step 1: Resetting the database...', colors.yellow);
  const resetResult = execute('npx prisma migrate reset --force');
  
  if (!resetResult.success) {
    log('Failed to reset the database.', colors.red);
    log('You may need to set up the DATABASE_URL environment variable or fix issues with your Prisma schema.', colors.red);
    return;
  }
  
  // Step 2: Create a new migration
  log('\n🚀 Step 2: Creating a new migration...', colors.yellow);
  const migrationResult = execute('npx prisma migrate dev --name initial_setup');
  
  if (!migrationResult.success) {
    log('Failed to create a new migration.', colors.red);
    log('You may need to fix issues with your Prisma schema.', colors.red);
    return;
  }
  
  // Step 3: Generate Prisma client
  log('\n🔧 Step 3: Generating Prisma client...', colors.yellow);
  const generateResult = execute('npx prisma generate');
  
  if (!generateResult.success) {
    log('Failed to generate Prisma client.', colors.red);
    return;
  }
  
  // Reset complete
  log('\n✅ Database reset complete!', colors.green);
  log('Your database has been reset and is now ready to use.', colors.green);
  log('\nNext steps:', colors.magenta);
  log('1. Run "node scripts/migrate-to-database.js" to migrate your content to the database.', colors.cyan);
  log('2. Start your Next.js application with "npm run dev".', colors.cyan);
}

// Run the reset
resetDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    log('An unexpected error occurred during reset:', colors.red);
    log(error.message, colors.red);
    process.exit(1);
  });
