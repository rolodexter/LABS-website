/**
 * Utility functions for processing research content
 */

/**
 * Generate a slug from a title
 * @param title Title of the research article
 * @returns slug formatted for URL use
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract a summary from the content
 * @param content Full markdown content
 * @returns A summarized excerpt without markdown formatting
 */
export function extractSummary(content: string): string {
  // Find the first paragraph after frontmatter
  const match = content.match(/---\n[\s\S]*?---\n\n([\s\S]*?)(?:\n\n|\n##|\n---)/);
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

/**
 * Normalize research frontmatter
 * @param frontmatter Original frontmatter from markdown file
 * @returns Normalized frontmatter with required fields
 */
export function normalizeFrontmatter(frontmatter: any, fileName: string): any {
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
  
  return normalized;
}

/**
 * Extract categories and topics from processed research files
 * @param researchFiles Array of processed research files
 * @returns Object with unique categories and topics
 */
export function extractCategoriesAndTopics(researchFiles: any[]): { 
  categories: string[], 
  topics: string[] 
} {
  const categories = new Set<string>();
  const topics = new Set<string>();
  
  researchFiles.forEach(file => {
    if (file.frontmatter.category) {
      categories.add(file.frontmatter.category);
    }
    
    if (file.frontmatter.topic) {
      topics.add(file.frontmatter.topic);
    }
  });
  
  return {
    categories: Array.from(categories),
    topics: Array.from(topics)
  };
}
