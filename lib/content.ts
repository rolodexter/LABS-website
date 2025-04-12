import { prisma } from './prisma';
import { Tag, Category } from '@prisma/client';
// Keep categories import for backward compatibility
import { categories, getCategoryById } from './categories';

// Define content types
export type ContentType = 'knowledge' | 'product' | 'service';

// Define content section types for magazine-style layout
export type ContentSection = {
  title: string;
  description: string;
  items: ContentItem[];
  layout: 'featured' | 'grid' | 'list' | 'spotlight';
  backgroundColor?: string;
  textColor?: string;
};

// Define content item structure
export type ContentItem = {
  meta: {
    title: string;
    slug: string;
    category: string;
    summary: string;
    last_updated: string;
    status: string;
    featured?: boolean;
    dailyFocus?: boolean;
    tags?: string[];
    complexity?: 'beginner' | 'intermediate' | 'advanced';
  };
  content: string;
  raw_content?: string;
  type: ContentType;
  readTime?: number;
  wordCount?: number;
};

// Get the content directory based on type
const getContentDirectory = (type: ContentType): string => {
  return path.join(process.cwd(), 'content', type);
};

// Parse a content file (MDX or MD)
export const parseContentFile = (filePath: string, type: ContentType): ContentItem | null => {
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
    const wordCount = content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // Assuming 200 words per minute

    // Generate excerpt by finding the second paragraph and skipping markdown formatting
    let excerpt = '';
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

    // Skip paragraphs that start with markdown headers (#) or contain only formatting
    const contentParagraphs = paragraphs.filter(
      p => !p.trim().startsWith('#') && !p.trim().match(/^[\*_`]+$/)
    );

    // Use the first real content paragraph (which should be the second paragraph in most cases)
    if (contentParagraphs.length > 0) {
      // Remove markdown formatting characters
      excerpt = contentParagraphs[0]
        .replace(/[\*_`#]+/g, '') // Remove markdown formatting
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just the text
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
      meta: {
        title: data.title,
        slug: data.slug,
        category: category || 'uncategorized',
        summary: data.summary || '',
        last_updated: data.last_updated || new Date().toISOString().split('T')[0],
        status: data.status || 'published',
        featured: data.featured || false,
        dailyFocus: data.dailyFocus || false,
        tags: data.tags || [],
      },
      content,
      excerpt,
      readingTime: readingTimeMinutes,
    };
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
};

// Get all content of a specific type
export const getAllContent = (type: ContentType): ContentItem[] => {
  const contentDir = getContentDirectory(type);

  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory ${contentDir} does not exist`);
    return [];
  }

  // Function to recursively get all files
  const getAllFiles = (dir: string): string[] => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map(dirent => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getAllFiles(res) : res;
    });
    return Array.prototype.concat(...files);
  };

  // Get all files with .md or .mdx extension
  const files = getAllFiles(contentDir).filter(
    file => file.endsWith('.md') || file.endsWith('.mdx')
  );

  // Parse each file and filter out nulls
  const contentItems = files
    .map(file => parseContentFile(file, type))
    .filter((item): item is ContentItem => item !== null);

  // Sort by last updated date (newest first)
  return contentItems.sort((a, b) => {
    return new Date(b.meta.last_updated).getTime() - new Date(a.meta.last_updated).getTime();
  });
};

// Get content by category
export function getContentByCategory(category: string, count = 10): ContentItem[] {
  const allContent = getAllContent('knowledge');
  return allContent.filter(item => item.meta.category.startsWith(category)).slice(0, count);
}

// Get content by tag
export const getContentByTag = (tag: string, count = 10): ContentItem[] => {
  const allContent = getAllContent('knowledge');
  return allContent.filter(item => item.meta.tags && item.meta.tags.includes(tag)).slice(0, count);
};

// Get content by slug
export const getContentBySlug = (slug: string): ContentItem | null => {
  // Normalize the slug by removing leading slash if present
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;

  // Determine content type from slug
  let contentType: ContentType = 'knowledge';
  if (normalizedSlug.includes('/product/')) {
    contentType = 'product';
  } else if (normalizedSlug.includes('/service/')) {
    contentType = 'service';
  }

  const allContent = getAllContent(contentType);

  // Try to find the content with exact slug match
  let content = allContent.find(item => item.meta.slug === normalizedSlug);

  // If not found, try with different slug formats
  if (!content) {
    // Try without leading slash
    const slugWithoutLeadingSlash = normalizedSlug.substring(1);
    content = allContent.find(
      item =>
        item.meta.slug === slugWithoutLeadingSlash ||
        item.meta.slug === `/${slugWithoutLeadingSlash}` ||
        item.meta.slug === `knowledge/${slugWithoutLeadingSlash}` ||
        item.meta.slug === `/knowledge/${slugWithoutLeadingSlash}`
    );
  }

  // If still not found, try with more flexible matching
  if (!content) {
    // Extract the last part of the slug (e.g., 'article-name' from '/knowledge/category/article-name')
    const slugParts = normalizedSlug.split('/');
    const lastSlugPart = slugParts[slugParts.length - 1];

    content = allContent.find(item => {
      const itemSlugParts = item.meta.slug.split('/');
      return itemSlugParts[itemSlugParts.length - 1] === lastSlugPart;
    });
  }

  return content || null;
};

// Get content sections for magazine-style layout
export function getContentSections(): ContentSection[] {
  return [
    {
      title: 'Daily Focus',
      description: "Today's highlighted content",
      items: [getDailyFocusContent()].filter(Boolean) as ContentItem[],
      layout: 'spotlight',
    },
    {
      title: 'Featured Research',
      description: 'Cutting-edge research from rolodexter labs',
      items: getContentByCategory('research', 3),
      layout: 'featured',
      backgroundColor: '#f8f9fa',
    },
    {
      title: 'Intelligence Systems',
      description: 'Explore our intelligence frameworks and architectures',
      items: getContentByCategory('intelligence', 4),
      layout: 'grid',
    },
    {
      title: 'Agent Ecosystem',
      description: 'Learn about the rolodexter agent ecosystem',
      items: getContentByCategory('ecosystem', 3),
      layout: 'list',
      backgroundColor: '#000',
      textColor: '#fff',
    },
  ];
}

// Get featured content
export function getFeaturedContent(count = 3): ContentItem[] {
  // Get all content
  const allContent = getAllContent('knowledge');

  // First look for content with featured: true in frontmatter
  const explicitlyFeatured = allContent.filter(item => item.meta.featured === true);

  if (explicitlyFeatured.length >= count) {
    return explicitlyFeatured.slice(0, count);
  }

  // If we don't have enough explicitly featured items, add items from featured categories
  const featuredCategories = categories.filter(cat => cat.featured).map(cat => cat.id);

  const fromFeaturedCategories = allContent.filter(item =>
    featuredCategories.some(catId => item.meta.category.startsWith(catId))
  );

  // Combine and deduplicate
  const combined = [...explicitlyFeatured];

  for (const item of fromFeaturedCategories) {
    if (!combined.some(c => c.meta.slug === item.meta.slug) && combined.length < count) {
      combined.push(item);
    }
  }

  // If we still don't have enough, add the most recent items
  if (combined.length < count) {
    const remaining = allContent.filter(
      item => !combined.some(c => c.meta.slug === item.meta.slug)
    );

    combined.push(...remaining.slice(0, count - combined.length));
  }

  return combined.slice(0, count);
}

// Get daily focus content
export function getDailyFocusContent(): ContentItem | null {
  // Get all content
  const allContent = getAllContent('knowledge');

  // First check for content with dailyFocus: true in frontmatter
  const explicitDailyFocus = allContent.find(item => item.meta.dailyFocus === true);
  if (explicitDailyFocus) return explicitDailyFocus;

  // If no explicit daily focus, use the most recently updated item
  return allContent.length > 0 ? allContent[0] : null;
}
