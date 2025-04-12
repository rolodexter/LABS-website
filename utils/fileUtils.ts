import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface KnowledgeFile {
  title: string;
  slug: string;
  modifiedTime: Date;
  content?: string;
  contentHtml?: string;
  frontmatter?: Record<string, any>;
}

/**
 * Get the most recently modified knowledge files
 * @param count Number of files to return
 * @returns Array of knowledge files sorted by modification time (newest first)
 */
export function getRecentKnowledgeFiles(count: number = 30): KnowledgeFile[] {
  const contentDir = path.join(process.cwd(), 'content');
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return getSampleKnowledgeFiles(count); // Fallback to sample data
  }
  
  const allFiles: KnowledgeFile[] = [];
  
  // Function to recursively get all files
  function getFilesRecursively(directory: string) {
    if (!fs.existsSync(directory)) return;
    
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        getFilesRecursively(fullPath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        try {
          // Get file content to extract title and frontmatter
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data: frontmatter, content: markdownContent } = matter(content);
          
          // Get title from frontmatter or filename
          const title = frontmatter.title || path.basename(file, path.extname(file));
          
          // Create relative slug from file path
          const relativePath = path.relative(contentDir, fullPath);
          const slug = '/' + relativePath.replace(/\\/g, '/').replace(/\.(md|mdx)$/, '');
          
          allFiles.push({
            title,
            slug,
            modifiedTime: stat.mtime,
            content: markdownContent,
            frontmatter
          });
        } catch (error) {
          console.error(`Error processing file ${fullPath}:`, error);
        }
      }
    }
  }
  
  try {
    getFilesRecursively(contentDir);
  } catch (error) {
    console.error('Error reading content files:', error);
    return getSampleKnowledgeFiles(count); // Fallback to sample data
  }
  
  // Sort by modification time (newest first) and limit to count
  return allFiles
    .sort((a, b) => b.modifiedTime.getTime() - a.modifiedTime.getTime())
    .slice(0, count);
}

/**
 * Generate sample knowledge files for development
 * @param count Number of sample files to generate
 * @returns Array of sample knowledge files
 */
export function getSampleKnowledgeFiles(count: number = 30): KnowledgeFile[] {
  const topics = [
    'Architecture', 'Design Patterns', 'API Development', 
    'User Experience', 'Performance', 'Security',
    'Content Management', 'Data Structures', 'Algorithms',
    'DevOps', 'Deployment', 'Testing',
    'Documentation', 'Accessibility', 'Internationalization'
  ];
  
  const prefixes = [
    'Understanding', 'Guide to', 'Introduction to', 
    'Advanced', 'Practical', 'Essential',
    'Comprehensive', 'Modern', 'Effective',
    'Strategic', 'Fundamental', 'Complete'
  ];
  
  const systems = [
    'rolodexterGPT', 'rolodexterVS', 'rolodexterGIT',
    'rolodexterAPI', 'rolodexterINT', 'rolodexterLABS'
  ];
  
  const files: KnowledgeFile[] = [];
  
  for (let i = 0; i < count; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const system = systems[Math.floor(Math.random() * systems.length)];
    
    // Create a title
    const title = `${prefix} ${topic} in ${system}`;
    
    // Create a slug
    const slug = `/knowledge/${topic.toLowerCase()}/${title.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Create a random date within the last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const modifiedTime = new Date();
    modifiedTime.setDate(modifiedTime.getDate() - daysAgo);
    
    files.push({
      title,
      slug,
      modifiedTime
    });
  }
  
  // Sort by modification time (newest first)
  return files.sort((a, b) => b.modifiedTime.getTime() - a.modifiedTime.getTime());
}
