/**
 * Content Migration Script
 * 
 * This script migrates content from the file system to the PostgreSQL database.
 * It reads all content files from the content directory and inserts them into the database.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define content types to migrate
const contentTypes = ['knowledge', 'product', 'service'];

// Get the content directory based on type
const getContentDirectory = (type) => {
  return path.join(process.cwd(), 'content', type);
};

// Parse a content file (MDX or MD)
const parseContentFile = (filePath, type) => {
  try {
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter with gray-matter
    const { data, content } = matter(fileContents);
    
    // Validate required fields
    if (!data.title || !data.slug) {
      console.warn(`Missing required fields in ${filePath}`);
      return null;
    }
    
    // Extract category from file path
    const relativePath = filePath.replace(getContentDirectory(type), '');
    const pathSegments = relativePath.split(path.sep).filter(Boolean);
    pathSegments.pop(); // Remove filename
    const category = pathSegments.join('/');
    
    // Calculate reading time (simple estimation)
    const wordCount = content.trim().split(/\\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    // Generate excerpt by finding the second paragraph and skipping markdown formatting
    let excerpt = '';
    const paragraphs = content.split('\\n\\n').filter(p => p.trim() !== '');
    
    // Skip paragraphs that start with markdown headers (#) or contain only formatting
    const contentParagraphs = paragraphs.filter(p => !p.trim().startsWith('#') && !p.trim().match(/^[\\*_`]+$/));
    
    // Use the first real content paragraph (which should be the second paragraph in most cases)
    if (contentParagraphs.length > 0) {
      // Remove markdown formatting characters
      excerpt = contentParagraphs[0]
        .replace(/[\\*_`#]+/g, '') // Remove markdown formatting
        .replace(/\\[([^\\]]+)\\]\\([^)]+\\)/g, '$1') // Replace links with just the text
        .trim();
      
      // Limit to reasonable length and add ellipsis
      if (excerpt.length > 150) {
        excerpt = excerpt.substring(0, 150) + '...';
      }
    } else {
      // Fallback to summary if no suitable paragraph found
      excerpt = data.summary || '';
    }
    
    // Return structured content item
    return {
      title: data.title,
      slug: data.slug.startsWith('/') ? data.slug : `/${data.slug}`,
      type,
      content,
      excerpt,
      published: data.status !== 'draft',
      featured: data.featured || false,
      tags: data.tags || [],
      categories: [category || 'uncategorized'],
    };
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
};

// Get all content files of a specific type
const getAllContentFiles = (type) => {
  const contentDir = getContentDirectory(type);
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory ${contentDir} does not exist`);
    return [];
  }
  
  // Function to recursively get all files
  const getAllFiles = (dir) => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getAllFiles(res) : res;
    });
    return Array.prototype.concat(...files);
  };
  
  // Get all files with .md or .mdx extension
  const files = getAllFiles(contentDir).filter(
    (file) => file.endsWith('.md') || file.endsWith('.mdx')
  );
  
  // Parse each file and filter out nulls
  return files
    .map(file => parseContentFile(file, type))
    .filter(item => item !== null);
};

// Migrate content to the database
async function migrateContent() {
  try {
    console.log('Starting content migration to database...');
    
    let totalMigrated = 0;
    
    // Process each content type
    for (const type of contentTypes) {
      console.log(`Processing ${type} content...`);
      
      const contentItems = getAllContentFiles(type);
      console.log(`Found ${contentItems.length} ${type} files to migrate`);
      
      // Process each content item
      for (const item of contentItems) {
        try {
          // Process tags
          const tagConnections = item.tags.length > 0
            ? {
                connectOrCreate: item.tags.map(tag => ({
                  where: { name: tag },
                  create: { 
                    name: tag, 
                    slug: tag.toLowerCase().replace(/\\s+/g, '-')
                  }
                }))
              }
            : undefined;
          
          // Process categories
          const categoryConnections = item.categories.length > 0
            ? {
                connectOrCreate: item.categories.map(category => ({
                  where: { name: category },
                  create: { 
                    name: category, 
                    slug: category.toLowerCase().replace(/\\s+/g, '-')
                  }
                }))
              }
            : undefined;
          
          // Check if content with this slug already exists
          const existingContent = await prisma.contentItem.findUnique({
            where: { slug: item.slug },
          });
          
          if (existingContent) {
            console.log(`Content with slug ${item.slug} already exists, updating...`);
            
            // Update existing content
            await prisma.contentItem.update({
              where: { id: existingContent.id },
              data: {
                title: item.title,
                content: item.content,
                excerpt: item.excerpt,
                published: item.published,
                featured: item.featured,
                tags: tagConnections,
                categories: categoryConnections,
                updatedAt: new Date(),
              },
            });
          } else {
            // Create new content
            await prisma.contentItem.create({
              data: {
                title: item.title,
                slug: item.slug,
                type: item.type,
                content: item.content,
                excerpt: item.excerpt,
                published: item.published,
                featured: item.featured,
                tags: tagConnections,
                categories: categoryConnections,
              },
            });
          }
          
          totalMigrated++;
          console.log(`Migrated: ${item.title} (${item.slug})`);
        } catch (error) {
          console.error(`Error migrating content item ${item.title}:`, error);
        }
      }
    }
    
    console.log(`Migration complete! Migrated ${totalMigrated} content items to the database.`);
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateContent()
  .then(() => {
    console.log('Migration script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  });
