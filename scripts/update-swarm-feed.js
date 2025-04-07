/**
 * update-swarm-feed.js
 * 
 * CLI utility to generate and update the swarm feed JSON for the homepage visualization.
 * This script should be run whenever new tasks or prompts are added to the system.
 */

const { generateSwarmFeed } = require('./generate-swarm-feed');

// Add npm script command
async function main() {
  try {
    console.log('🔄 Updating swarm simulation feed...');
    
    const feed = await generateSwarmFeed();
    console.log(`✅ Swarm feed updated with ${feed.events.length} events and ${feed.terminalLogs.length} terminal logs`);
    console.log('🚀 The homepage visualization will now use the latest data');
    
  } catch (error) {
    console.error('❌ Error updating swarm feed:', error);
    process.exit(1);
  }
}

// Run the script
main();
