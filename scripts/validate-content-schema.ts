import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentItem, ContentType } from '../lib/content';

// Content directories to validate
const CONTENT_DIRS: Record<ContentType, string> = {
  knowledge: path.resolve(__dirname, '../content/knowledge'),
  product: path.resolve(__dirname, '../content/products'),
  service: path.resolve(__dirname, '../content/services')
};

// Required and optional metadata fields
const REQUIRED_META_FIELDS: (keyof ContentItem['meta'])[] = [
  'title', 
  'slug', 
  'category', 
  'summary', 
  'last_updated', 
  'status'
];

const OPTIONAL_META_FIELDS: (keyof ContentItem['meta'])[] = [
  'featured', 
  'dailyFocus', 
  'tags', 
  'complexity', 
  'dependencies'
];

function validateContentFile(filePath: string, type: ContentType): string[] {
  const errors: string[] = [];
  
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Validate required metadata fields
    REQUIRED_META_FIELDS.forEach(field => {
      if (!frontmatter[field]) {
        errors.push(`Missing required field '${field}' in ${path.basename(filePath)}`);
      }
    });

    // Validate dependencies if present
    if (frontmatter.dependencies) {
      if (!Array.isArray(frontmatter.dependencies)) {
        errors.push(`'dependencies' must be an array in ${path.basename(filePath)}`);
      } else {
        frontmatter.dependencies.forEach((dep, index) => {
          if (typeof dep !== 'string') {
            errors.push(`Dependency #${index} must be a string in ${path.basename(filePath)}`);
          }
        });
      }
    }

    // Validate content length
    if (content.trim().length === 0) {
      errors.push(`Empty content in ${path.basename(filePath)}`);
    }

  } catch (error) {
    errors.push(`Error processing ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return errors;
}

function validateContentDirectory(type: ContentType): string[] {
  const directoryErrors: string[] = [];
  const contentDir = CONTENT_DIRS[type];

  try {
    const files = fs.readdirSync(contentDir);
    
    files.forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(contentDir, file);
        const fileErrors = validateContentFile(filePath, type);
        
        if (fileErrors.length > 0) {
          directoryErrors.push(...fileErrors);
        }
      }
    });
  } catch (error) {
    directoryErrors.push(`Error reading ${type} content directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return directoryErrors;
}

function runContentSchemaValidation() {
  console.log('🔍 Running Content Schema Validation...');
  
  let totalErrors = 0;
  const allErrors: Record<ContentType, string[]> = {
    knowledge: [],
    product: [],
    service: []
  };

  // Validate each content type
  (Object.keys(CONTENT_DIRS) as ContentType[]).forEach(type => {
    console.log(`\n📂 Validating ${type} content...`);
    
    const typeErrors = validateContentDirectory(type);
    allErrors[type] = typeErrors;
    totalErrors += typeErrors.length;

    if (typeErrors.length > 0) {
      console.error(`❌ Found ${typeErrors.length} errors in ${type} content:`);
      typeErrors.forEach(error => console.error(`   - ${error}`));
    }
  });

  if (totalErrors === 0) {
    console.log('✅ All content files passed schema validation!');
    process.exit(0);
  } else {
    console.error(`❌ Found ${totalErrors} total content schema issues.`);
    process.exit(1);
  }
}

// Run the validation
runContentSchemaValidation();
