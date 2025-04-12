/**
 * Content Migration Script
 * 
 * This script migrates content from the Docusaurus site to the centralized Next.js structure.
 * It extracts content from the Docusaurus docs and blog directories and places them in the
 * appropriate content directories in the Next.js site.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const DOCUSAURUS_ROOT = path.join(__dirname, '..', 'my-knowledge-site');
const DOCS_DIR = path.join(DOCUSAURUS_ROOT, 'docs');
const BLOG_DIR = path.join(DOCUSAURUS_ROOT, 'blog');
const NEXTJS_CONTENT_DIR = path.join(__dirname, '..', 'content');
const KNOWLEDGE_DIR = path.join(NEXTJS_CONTENT_DIR, 'knowledge');
const ARTICLES_DIR = path.join(NEXTJS_CONTENT_DIR, 'articles');

// Create directories if they don't exist
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Process a markdown file
function processMarkdownFile(sourcePath, targetDir, type) {
  try {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Create a new filename based on the original
    const fileName = path.basename(sourcePath);
    
    // Create subdirectories based on the relative path
    const relativeDir = path.dirname(path.relative(
      type === 'docs' ? DOCS_DIR : BLOG_DIR,
      sourcePath
    ));
    
    const targetSubDir = path.join(targetDir, relativeDir);
    ensureDirectoryExists(targetSubDir);
    
    // Update frontmatter if needed
    if (!frontmatter.type) {
      frontmatter.type = type === 'docs' ? 'knowledge' : 'article';
    }
    
    // Create the new file content with updated frontmatter
    const newContent = matter.stringify(markdownContent, frontmatter);
    
    // Write the file
    const targetPath = path.join(targetSubDir, fileName);
    fs.writeFileSync(targetPath, newContent);
    console.log(`Migrated: ${sourcePath} -> ${targetPath}`);
    
    return true;
  } catch (error) {
    console.error(`Error processing ${sourcePath}:`, error);
    return false;
  }
}

// Process all files in a directory recursively
function processDirectory(sourceDir, targetDir, type) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Source directory does not exist: ${sourceDir}`);
    return 0;
  }
  
  let count = 0;
  
  function processRecursively(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        processRecursively(itemPath);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        if (processMarkdownFile(itemPath, targetDir, type)) {
          count++;
        }
      }
    }
  }
  
  processRecursively(sourceDir);
  return count;
}

// Main function
function migrateContent() {
  console.log('Starting content migration...');
  
  // Ensure target directories exist
  ensureDirectoryExists(NEXTJS_CONTENT_DIR);
  ensureDirectoryExists(KNOWLEDGE_DIR);
  ensureDirectoryExists(ARTICLES_DIR);
  
  // Process docs (knowledge)
  const docsCount = processDirectory(DOCS_DIR, KNOWLEDGE_DIR, 'docs');
  console.log(`Migrated ${docsCount} knowledge files.`);
  
  // Process blog (articles)
  const blogCount = processDirectory(BLOG_DIR, ARTICLES_DIR, 'blog');
  console.log(`Migrated ${blogCount} article files.`);
  
  console.log('Content migration complete!');
}

// Run the migration
migrateContent();
