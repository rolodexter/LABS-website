import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentType, ContentItem } from '../lib/content';

// Content directories to validate
const CONTENT_DIRS: Record<ContentType, string> = {
  knowledge: path.resolve(__dirname, '../content/knowledge'),
  product: path.resolve(__dirname, '../content/products'),
  service: path.resolve(__dirname, '../content/services')
};

// Validation rules for content items
const VALIDATION_RULES = {
  requiredMetaFields: [
    'title', 
    'slug', 
    'category', 
    'summary', 
    'last_updated', 
    'status'
  ],
  optionalMetaFields: [
    'featured', 
    'dailyFocus', 
    'tags', 
    'complexity', 
    'dependencies'
  ],
  contentRules: {
    minLength: 50,  // Minimum content length
    maxLength: 10000  // Maximum content length
  }
};

// Logging utility
function log(message: string, type: 'info' | 'warn' | 'error' = 'info') {
  const colors = {
    info: '\x1b[36m',  // Cyan
    warn: '\x1b[33m',  // Yellow
    error: '\x1b[31m'  // Red
  };
  const reset = '\x1b[0m';
  console.log(`${colors[type]}${message}${reset}`);
}

// Validate a single content file
function validateContentFile(filePath: string, type: ContentType): string[] {
  const errors: string[] = [];
  
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Validate required metadata fields
    VALIDATION_RULES.requiredMetaFields.forEach(field => {
      if (!frontmatter[field]) {
        errors.push(`Missing required field '${field}' in ${path.basename(filePath)}`);
      }
    });

    // Validate optional fields if present
    VALIDATION_RULES.optionalMetaFields.forEach(field => {
      if (frontmatter[field]) {
        // Add specific validations for optional fields if needed
        switch (field) {
          case 'tags':
            if (!Array.isArray(frontmatter[field])) {
              errors.push(`'${field}' must be an array in ${path.basename(filePath)}`);
            }
            break;
          case 'dependencies':
            if (!Array.isArray(frontmatter[field])) {
              errors.push(`'${field}' must be an array in ${path.basename(filePath)}`);
            }
            break;
        }
      }
    });

    // Validate content length
    const trimmedContent = content.trim();
    if (trimmedContent.length < VALIDATION_RULES.contentRules.minLength) {
      errors.push(`Content too short in ${path.basename(filePath)} (min ${VALIDATION_RULES.contentRules.minLength} chars)`);
    }
    if (trimmedContent.length > VALIDATION_RULES.contentRules.maxLength) {
      errors.push(`Content too long in ${path.basename(filePath)} (max ${VALIDATION_RULES.contentRules.maxLength} chars)`);
    }

    // Optional: Add more sophisticated content validation
    // E.g., check for markdown formatting, links, etc.

  } catch (error) {
    errors.push(`Error processing ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return errors;
}

// Validate all content files in a directory
function validateContentDirectory(type: ContentType): string[] {
  const directoryErrors: string[] = [];
  const contentDir = CONTENT_DIRS[type];

  try {
    // Ensure content directory exists
    if (!fs.existsSync(contentDir)) {
      directoryErrors.push(`Content directory for ${type} does not exist: ${contentDir}`);
      return directoryErrors;
    }

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

// Main validation function
function runContentValidation() {
  log('🔍 Running Comprehensive Content Validation...', 'info');
  
  let totalErrors = 0;
  const allErrors: Record<ContentType, string[]> = {
    knowledge: [],
    product: [],
    service: []
  };

  // Validate each content type
  (Object.keys(CONTENT_DIRS) as ContentType[]).forEach(type => {
    log(`\n📂 Validating ${type} content...`, 'info');
    
    const typeErrors = validateContentDirectory(type);
    allErrors[type] = typeErrors;
    totalErrors += typeErrors.length;

    if (typeErrors.length > 0) {
      log(`❌ Found ${typeErrors.length} errors in ${type} content:`, 'error');
      typeErrors.forEach(error => log(`   - ${error}`, 'error'));
    }
  });

  // Generate summary report
  log('\n📊 Validation Summary:', 'info');
  log(`   Total Errors: ${totalErrors}`, totalErrors > 0 ? 'error' : 'info');
  
  Object.entries(allErrors).forEach(([type, errors]) => {
    log(`   ${type.toUpperCase()} Errors: ${errors.length}`, errors.length > 0 ? 'warn' : 'info');
  });

  // Exit with appropriate status code
  if (totalErrors === 0) {
    log('✅ All content files passed validation!', 'info');
    process.exit(0);
  } else {
    log('❌ Content validation failed. Please review and fix the reported issues.', 'error');
    process.exit(1);
  }
}

// Run the validation
runContentValidation();
