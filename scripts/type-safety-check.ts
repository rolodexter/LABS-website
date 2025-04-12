import { ContentItem, ContentType } from '../lib/content';
import { getAllContent } from '../lib/content';

// Define expected keys for ContentItem
const REQUIRED_META_KEYS: (keyof ContentItem['meta'])[] = [
  'title', 
  'slug', 
  'category', 
  'summary', 
  'last_updated', 
  'status'
];

const OPTIONAL_META_KEYS: (keyof ContentItem['meta'])[] = [
  'featured', 
  'dailyFocus', 
  'tags', 
  'complexity'
];

const REQUIRED_CONTENT_KEYS: (keyof Omit<ContentItem, 'meta'>)[] = [
  'content', 
  'type'
];

const OPTIONAL_CONTENT_KEYS: (keyof Omit<ContentItem, 'meta'>)[] = [
  'raw_content', 
  'readTime', 
  'wordCount'
];

function validateContentItem(item: ContentItem): string[] {
  const errors: string[] = [];

  // Check meta keys
  REQUIRED_META_KEYS.forEach(key => {
    if (!(key in item.meta)) {
      errors.push(`Missing required meta key: ${key}`);
    }
  });

  // Check content keys
  REQUIRED_CONTENT_KEYS.forEach(key => {
    if (!(key in item)) {
      errors.push(`Missing required content key: ${key}`);
    }
  });

  // Optional validations
  if (item.readTime !== undefined && typeof item.readTime !== 'number') {
    errors.push('readTime must be a number');
  }

  if (item.wordCount !== undefined && typeof item.wordCount !== 'number') {
    errors.push('wordCount must be a number');
  }

  return errors;
}

function runTypeSafetyCheck() {
  console.log('🕵️ Running Content Type Safety Check...');

  // Get all content types
  const contentTypes: ContentType[] = ['knowledge', 'product', 'service'];
  let totalErrors = 0;

  contentTypes.forEach(type => {
    console.log(`\n🔍 Checking ${type} content...`);
    
    const content = getAllContent(type);
    
    content.forEach((item, index) => {
      const itemErrors = validateContentItem(item);
      
      if (itemErrors.length > 0) {
        console.error(`❌ Error in ${type} content item #${index}:`);
        itemErrors.forEach(error => console.error(`   - ${error}`));
        totalErrors += itemErrors.length;
      }
    });
  });

  if (totalErrors === 0) {
    console.log('✅ All content items passed type safety checks!');
    process.exit(0);
  } else {
    console.error(`❌ Found ${totalErrors} type safety issues.`);
    process.exit(1);
  }
}

// Run the check
runTypeSafetyCheck();
