/**
 * migrate-tasks.js
 * 
 * Utility script to migrate legacy HTML task files to the new markdown format
 * with frontmatter, following the rolodexterLABS task schema.
 * 
 * Usage: node scripts/migrate-tasks.js
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const LEGACY_TASKS_DIR = path.join(__dirname, '../__tasks__');
const NEW_TASKS_DIR = path.join(__dirname, '../content/system/tasks');
const DATE_NOW = new Date().toISOString();

// Create tasks directory if it doesn't exist
if (!fs.existsSync(NEW_TASKS_DIR)) {
  fs.mkdirSync(NEW_TASKS_DIR, { recursive: true });
  console.log(`Created directory: ${NEW_TASKS_DIR}`);
}

/**
 * Converts checklist items from HTML format to markdown format
 * @param {string} checklistHtml - HTML checklist content
 * @returns {Array} Array of markdown-formatted checklist items
 */
function convertChecklistItems(checklistHtml) {
  const items = [];
  const dom = new JSDOM(`<div>${checklistHtml}</div>`);
  const listItems = dom.window.document.querySelectorAll('li');
  
  listItems.forEach(li => {
    const text = li.textContent.trim();
    // Check if item contains a checkmark or empty box
    const isCompleted = text.includes('✅');
    // Remove the emoji and clean up the text
    const cleanText = text.replace(/^[✅⬜]\s*/, '').trim();
    // Convert to markdown checkbox format
    items.push(`- [${isCompleted ? 'x' : ' '}] ${cleanText}`);
  });
  
  return items;
}

/**
 * Extracts task metadata from HTML content
 * @param {string} htmlContent - Content of the HTML task file
 * @returns {Object} Extracted task metadata
 */
function extractTaskMetadata(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;
  
  // Extract basic metadata
  const title = doc.querySelector('title')?.textContent || 'Untitled Task';
  const status = doc.querySelector('status')?.textContent || 'backlog';
  const description = doc.querySelector('description')?.textContent.trim() || '';
  const lastUpdated = doc.querySelector('last_updated')?.textContent || '';
  
  // Extract and convert checklist
  const checklistHtml = doc.querySelector('checklist')?.innerHTML || '';
  const checklistItems = convertChecklistItems(checklistHtml);
  
  // Determine if task is completed
  const isCompleted = status === 'complete' || status === 'archived';
  
  // Generate a task ID based on the title
  const taskId = `task-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  
  return {
    id: taskId,
    title,
    status: mapStatus(status),
    owner: 'rolodexterVS', // Default owner for all tasks
    priority: 3, // Default medium priority
    description,
    checklistItems,
    lastUpdated,
    isCompleted
  };
}

/**
 * Maps old status values to the new standardized values
 * @param {string} oldStatus - Status from HTML file
 * @returns {string} Standardized status value
 */
function mapStatus(oldStatus) {
  const statusMap = {
    'active': 'active',
    'paused': 'backlog',
    'complete': 'complete',
    'archived': 'archived',
    'not started': 'backlog'
  };
  
  return statusMap[oldStatus.toLowerCase()] || 'backlog';
}

/**
 * Generates frontmatter for the task
 * @param {Object} metadata - Task metadata
 * @returns {string} YAML frontmatter
 */
function generateFrontmatter(metadata) {
  const frontmatter = [
    '---',
    `id: ${metadata.id}`,
    `title: ${metadata.title}`,
    `status: ${metadata.status}`,
    `owner: ${metadata.owner}`,
    `priority: ${metadata.priority}`,
    `created_at: ${metadata.lastUpdated ? `${metadata.lastUpdated}T00:00:00Z` : DATE_NOW}`
  ];
  
  if (metadata.isCompleted) {
    frontmatter.push(`completed_at: ${metadata.lastUpdated ? `${metadata.lastUpdated}T00:00:00Z` : DATE_NOW}`);
  }
  
  frontmatter.push(`last_updated: ${DATE_NOW}`);
  
  // Add some relevant tags based on the title and description
  const tags = ['migrated'];
  
  if (metadata.title.toLowerCase().includes('cms')) {
    tags.push('cms', 'content');
  }
  
  if (metadata.title.toLowerCase().includes('auth')) {
    tags.push('authentication', 'security');
  }
  
  frontmatter.push(`tags: [${tags.join(', ')}]`);
  frontmatter.push('---');
  
  return frontmatter.join('\n');
}

/**
 * Generates markdown content for the task
 * @param {Object} metadata - Task metadata
 * @returns {string} Markdown content
 */
function generateMarkdown(metadata) {
  const sections = [
    `# ${metadata.title}`,
    '',
    '## Description',
    metadata.description,
    '',
    '## Checklist',
    ...metadata.checklistItems,
    '',
    '## Migration Notes',
    'This task was automatically migrated from the legacy HTML format to the new markdown format.',
    `Original last updated date: ${metadata.lastUpdated}`,
    ''
  ];
  
  return sections.join('\n');
}

/**
 * Migrates a single task file from HTML to markdown
 * @param {string} filename - Filename of the HTML task
 */
function migrateTaskFile(filename) {
  const sourcePath = path.join(LEGACY_TASKS_DIR, filename);
  
  try {
    // Read source file
    const htmlContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Extract metadata and generate content
    const metadata = extractTaskMetadata(htmlContent);
    const frontmatter = generateFrontmatter(metadata);
    const markdown = generateMarkdown(metadata);
    
    // Combine and write to destination
    const content = `${frontmatter}\n${markdown}`;
    const destPath = path.join(NEW_TASKS_DIR, `${metadata.id}.md`);
    
    fs.writeFileSync(destPath, content);
    console.log(`Successfully migrated: ${filename} → ${metadata.id}.md`);
    
    return {
      sourceFile: filename,
      destFile: `${metadata.id}.md`,
      id: metadata.id,
      title: metadata.title
    };
  } catch (error) {
    console.error(`Error migrating ${filename}:`, error);
    return null;
  }
}

/**
 * Main function to migrate all task files
 */
function migrateAllTasks() {
  console.log('Starting task migration...');
  
  // Get all HTML files in the legacy tasks directory
  const files = fs.readdirSync(LEGACY_TASKS_DIR)
    .filter(file => file.endsWith('.html'));
  
  if (files.length === 0) {
    console.log('No HTML task files found to migrate.');
    return;
  }
  
  console.log(`Found ${files.length} HTML task files to migrate.`);
  
  // Migrate each file
  const results = files.map(migrateTaskFile).filter(Boolean);
  
  console.log('\nMigration summary:');
  console.log(`Total files processed: ${files.length}`);
  console.log(`Successfully migrated: ${results.length}`);
  
  if (results.length > 0) {
    console.log('\nMigrated tasks:');
    results.forEach(result => {
      console.log(`- ${result.sourceFile} → ${result.destFile} (${result.title})`);
    });
  }
  
  console.log('\nTask migration completed!');
}

// Execute the migration
migrateAllTasks();
