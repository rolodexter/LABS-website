#!/usr/bin/env node
/**
 * log-prompt.js
 * 
 * A CLI utility for logging prompts between agents in the rolodexterLABS system.
 * Automates the creation of properly formatted prompt logs with frontmatter.
 * 
 * Usage: 
 *   node scripts/log-prompt.js --from=gpt --to=vs --content="path/to/file.txt"
 *   node scripts/log-prompt.js --from=gpt --to=vs --text="This is a prompt with [PROMPT:ARCHIVE] marker"
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const matter = require('gray-matter');
const { detectMarkers, generateFrontmatter, cleanPromptContent } = require('./prompt-marker-parser');

// Configure the base paths
const BASE_DIR = path.join(__dirname, '../content/system/prompts');
const DIRECTIONS = {
  'gpt-to-vs': path.join(BASE_DIR, 'gpt-to-vs'),
  'vs-to-gpt': path.join(BASE_DIR, 'vs-to-gpt'),
};

// Ensure the prompt directories exist
Object.values(DIRECTIONS).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Set up the command line interface
program
  .description('Log a prompt between rolodexterLABS agents')
  .option('-f, --from <agent>', 'source agent (gpt, vs, joe)', 'gpt')
  .option('-t, --to <agent>', 'target agent (gpt, vs, joe)', 'vs')
  .option('-c, --content <path>', 'path to file containing prompt content')
  .option('-x, --text <text>', 'direct prompt text (alternative to --content)')
  .option('--task <taskId>', 'related task ID')
  .option('--project <projectId>', 'related project ID')
  .option('--public', 'set visibility to public')
  .option('--private', 'set visibility to internal')
  .option('--simulate', 'flag for UI simulation')
  .option('--tags <tags>', 'comma-separated list of tags', commaSeparatedList)
  .option('--priority <number>', 'priority level (1-5)')
  .parse(process.argv);

// Helper to split comma-separated values into array
function commaSeparatedList(value) {
  return value.split(',').map(s => s.trim());
}

// Validates and normalizes agent names
function normalizeAgent(agent) {
  const mapping = {
    'gpt': 'rolodexterGPT',
    'vs': 'rolodexterVS',
    'rolodextergpt': 'rolodexterGPT',
    'rolodextervs': 'rolodexterVS',
    'joe': 'joe'
  };
  
  const normalized = mapping[agent.toLowerCase()];
  if (!normalized) {
    console.error(`Error: Unknown agent "${agent}". Use one of: gpt, vs, joe`);
    process.exit(1);
  }
  
  return normalized;
}

// Main function to create a prompt log
async function logPrompt() {
  const options = program.opts();
  
  // Validate required fields
  if (!options.content && !options.text) {
    console.error('Error: Either --content or --text must be provided');
    program.help();
  }
  
  // Get and normalize agent names
  const from = normalizeAgent(options.from);
  const to = normalizeAgent(options.to);
  
  // Determine which directory to use
  let directionKey;
  if (from === 'rolodexterGPT' && to === 'rolodexterVS') {
    directionKey = 'gpt-to-vs';
  } else if (from === 'rolodexterVS' && to === 'rolodexterGPT') {
    directionKey = 'vs-to-gpt';
  } else {
    console.error(`Error: Direction ${from} to ${to} is not supported yet.`);
    process.exit(1);
  }
  
  // Get prompt content
  let promptContent;
  if (options.content) {
    try {
      promptContent = fs.readFileSync(options.content, 'utf8');
    } catch (error) {
      console.error(`Error: Could not read file ${options.content}`, error);
      process.exit(1);
    }
  } else {
    promptContent = options.text;
  }
  
  // Extract markers or use command line overrides
  const markers = detectMarkers(promptContent);
  
  // Override with command line options if provided
  if (options.task) markers.task = options.task;
  if (options.project) markers.project = options.project;
  if (options.public) markers.public = true;
  if (options.private) markers.public = false;
  if (options.simulate) markers.simulate = true;
  if (options.tags) markers.tags = options.tags;
  if (options.priority) markers.priority = parseInt(options.priority, 10);
  
  // Force archive flag to true since we're explicitly running the tool
  markers.archive = true;
  
  // Generate frontmatter
  const frontmatter = generateFrontmatter(markers, from, to);
  
  // Clean the prompt content by removing markers
  const cleanContent = cleanPromptContent(promptContent);
  
  // Format the final markdown content
  const content = matter.stringify(`## Prompt

${cleanContent}

## Notes

This prompt was automatically archived using the prompt logging CLI.`, frontmatter);
  
  // Generate the output file path
  const outputDir = DIRECTIONS[directionKey];
  const outputFile = path.join(outputDir, `${frontmatter.id}.md`);
  
  // Write the file
  fs.writeFileSync(outputFile, content);
  
  console.log(`✓ Prompt successfully logged to ${outputFile}`);
  console.log(`  - From: ${from}`);
  console.log(`  - To: ${to}`);
  console.log(`  - ID: ${frontmatter.id}`);
  console.log(`  - Public: ${markers.public}`);
  console.log(`  - Simulate: ${markers.simulate}`);
  
  return outputFile;
}

// Execute if run directly
if (require.main === module) {
  logPrompt().catch(console.error);
}

module.exports = { logPrompt };
