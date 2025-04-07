/**
 * Script to process research markdown files from the intake directory
 * and move them to the content/research directory with standardized formatting
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths for intake and output
const RESEARCH_INTAKE_DIR = path.join(process.cwd(), 'content', 'research-intake');
const RESEARCH_OUTPUT_DIR = path.join(process.cwd(), 'content', 'research');

// Ensure output directory exists
if (!fs.existsSync(RESEARCH_OUTPUT_DIR)) {
  fs.mkdirSync(RESEARCH_OUTPUT_DIR, { recursive: true });
}

// Generate a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract a summary from the content
function extractSummary(content) {
  // Find the first paragraph after frontmatter
  const match = content.match(/---\n(?:.|\n)*?---\n\n(.*?)(?:\n\n|\n##|\n---)/s);
  if (match && match[1]) {
    // Strip markdown formatting
    let summary = match[1]
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/\[[^\]]*\]\([^)]*\)/g, '');
      
    // Truncate if too long (around 250 characters)
    if (summary.length > 250) {
      summary = summary.substring(0, 250).trim() + '...';
    }
    
    return summary;
  }
  
  return '';
}

// Normalize frontmatter with required fields
function normalizeFrontmatter(frontmatter, fileName) {
  const normalized = { ...frontmatter };
  
  // Ensure required fields exist
  if (!normalized.title) {
    normalized.title = fileName.replace(/\.md$/, '').replace(/-/g, ' ');
  }
  
  if (!normalized.slug) {
    normalized.slug = generateSlug(normalized.title);
  }
  
  if (!normalized.status) {
    normalized.status = 'Stable';
  }
  
  if (!normalized.date) {
    normalized.date = new Date().toISOString().split('T')[0];
  }
  
  if (!normalized.category) {
    normalized.category = 'Research';
  }
  
  if (!normalized.topic) {
    normalized.topic = 'General';
  }
  
  if (!normalized.author) {
    normalized.author = 'rolodexterLABS Research';
  }
  
  // Add summary if not present
  if (!normalized.summary) {
    normalized.summary = '';  // Will be populated later
  }
  
  return normalized;
}

// Process all markdown files in the intake directory
function processIntakeFiles() {
  console.log('Processing research intake files...');
  const intakeFiles = fs.readdirSync(RESEARCH_INTAKE_DIR)
    .filter(file => file.endsWith('.md'));
  
  const processedFiles = [];
  
  intakeFiles.forEach(fileName => {
    const filePath = path.join(RESEARCH_INTAKE_DIR, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);
    
    // Normalize frontmatter
    const normalizedFrontmatter = normalizeFrontmatter(frontmatter, fileName);
    
    // Extract summary if not provided
    if (!normalizedFrontmatter.summary || normalizedFrontmatter.summary.trim() === '') {
      normalizedFrontmatter.summary = extractSummary(fileContent);
    }
    
    // Create slug for filename
    const slug = normalizedFrontmatter.slug;
    const outputFilePath = path.join(RESEARCH_OUTPUT_DIR, `${slug}.md`);
    
    // Create the new file content
    const newFileContent = matter.stringify(content, normalizedFrontmatter);
    
    // Write to output file
    fs.writeFileSync(outputFilePath, newFileContent);
    
    // Add to processed files
    processedFiles.push({
      originalName: fileName,
      slug,
      frontmatter: normalizedFrontmatter
    });
    
    console.log(`Processed: ${fileName} -> ${slug}.md`);
  });
  
  // Generate a research index JSON file for use in the site
  const indexFilePath = path.join(process.cwd(), 'data', 'research-index.json');
  
  // Ensure the data directory exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Create a simplified index
  const researchIndex = processedFiles.map(file => ({
    slug: file.frontmatter.slug,
    title: file.frontmatter.title,
    category: file.frontmatter.category,
    topic: file.frontmatter.topic,
    date: file.frontmatter.date,
    status: file.frontmatter.status,
    summary: file.frontmatter.summary
  }));
  
  fs.writeFileSync(indexFilePath, JSON.stringify(researchIndex, null, 2));
  console.log(`Generated research index at: ${indexFilePath}`);
  
  // Extract unique categories and topics
  const categories = new Set();
  const topics = new Set();
  
  processedFiles.forEach(file => {
    if (file.frontmatter.category) {
      categories.add(file.frontmatter.category);
    }
    
    if (file.frontmatter.topic) {
      topics.add(file.frontmatter.topic);
    }
  });
  
  // Log results
  console.log('\nResearch content processing complete!');
  console.log(`Processed ${processedFiles.length} research files`);
  console.log(`\nFound ${categories.size} categories:`);
  categories.forEach(category => console.log(`  - ${category}`));
  
  console.log(`\nFound ${topics.size} topics:`);
  topics.forEach(topic => console.log(`  - ${topic}`));
  
  return {
    processedFiles,
    categories: Array.from(categories),
    topics: Array.from(topics)
  };
}

// Execute the processing
const results = processIntakeFiles();

// Export the results
module.exports = results;
