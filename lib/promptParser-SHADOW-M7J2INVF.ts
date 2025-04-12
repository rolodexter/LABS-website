import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define prompt types
export type PromptDirection = 'gpt-to-vs' | 'vs-to-gpt';

// Define prompt item structure
export type PromptItem = {
  meta: {
    id: string;
    title: string;
    tags: string[];
    author: string;
    recipient: string;
    date: string;
    status: string;
    priority: string;
    simulate?: boolean;
  };
  content: string;
  preview: string;
  direction: PromptDirection;
  filePath: string;
};

// Get the prompts directory
const getPromptsDirectory = (direction: PromptDirection): string => {
  return path.join(process.cwd(), 'content', 'system', 'prompts', direction);
};

// Get all prompts directory
const getAllPromptsDirectory = (): string => {
  return path.join(process.cwd(), 'content', 'system', 'prompts');
};

// Parse a prompt file
export const parsePromptFile = (filePath: string): PromptItem | null => {
  try {
    // Read the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter with gray-matter
    const { data, content } = matter(fileContents);
    
    // Validate required fields
    if (!data.id || !data.title) {
      console.warn(`Missing required fields in ${filePath}`);
      return null;
    }
    
    // Determine direction based on file path
    let direction: PromptDirection = 'gpt-to-vs';
    if (filePath.includes('/vs-to-gpt/')) {
      direction = 'vs-to-gpt';
    }
    
    // Generate preview from first line of content
    let preview = '';
    const contentLines = content.trim().split('\n');
    if (contentLines.length > 0) {
      // Get first non-empty line that's not a markdown header
      for (const line of contentLines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          preview = trimmedLine;
          break;
        }
      }
      
      // Limit to reasonable length and add ellipsis
      if (preview.length > 150) {
        preview = preview.substring(0, 150) + '...';
      }
    }
    
    // Return structured prompt item
    return {
      meta: {
        id: data.id,
        title: data.title,
        tags: data.tags || [],
        author: data.author || '',
        recipient: data.recipient || '',
        date: data.date || '',
        status: data.status || 'sent',
        priority: data.priority || 'normal',
        simulate: data.simulate || false,
      },
      content,
      preview,
      direction,
      filePath,
    };
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
};

// Get all prompts
export const getAllPrompts = (): PromptItem[] => {
  // Get prompts from both directories
  const gptToVsDir = getPromptsDirectory('gpt-to-vs');
  const vsToGptDir = getPromptsDirectory('vs-to-gpt');
  const rootPromptsDir = getAllPromptsDirectory();
  
  const allPromptFiles: string[] = [];
  
  // Function to recursively get all files
  const getAllFiles = (dir: string): string[] => {
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getAllFiles(res) : res;
    });
    return Array.prototype.concat(...files);
  };
  
  // Get all files from gpt-to-vs directory
  if (fs.existsSync(gptToVsDir)) {
    allPromptFiles.push(...getAllFiles(gptToVsDir));
  }
  
  // Get all files from vs-to-gpt directory
  if (fs.existsSync(vsToGptDir)) {
    allPromptFiles.push(...getAllFiles(vsToGptDir));
  }
  
  // Get all files from root prompts directory (excluding subdirectories)
  if (fs.existsSync(rootPromptsDir)) {
    const rootFiles = fs.readdirSync(rootPromptsDir, { withFileTypes: true })
      .filter(dirent => !dirent.isDirectory() && (dirent.name.endsWith('.md') || dirent.name.endsWith('.mdx')))
      .map(dirent => path.resolve(rootPromptsDir, dirent.name));
    
    allPromptFiles.push(...rootFiles);
  }
  
  // Filter to only include .md or .mdx files
  const mdFiles = allPromptFiles.filter(
    (file) => file.endsWith('.md') || file.endsWith('.mdx')
  );
  
  // Parse each file and filter out nulls
  const promptItems = mdFiles
    .map(file => parsePromptFile(file))
    .filter((item): item is PromptItem => item !== null);
  
  // Sort by date (newest first)
  return promptItems.sort((a, b) => {
    // Use date if available
    if (a.meta.date && b.meta.date) {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    }
    // Fallback to id which might contain date information
    return b.meta.id.localeCompare(a.meta.id);
  });
};

// Get prompts by tag
export const getPromptsByTag = (tag: string): PromptItem[] => {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => 
    prompt.meta.tags && prompt.meta.tags.includes(tag)
  );
};

// Get prompts by direction
export const getPromptsByDirection = (direction: PromptDirection): PromptItem[] => {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => prompt.direction === direction);
};

// Get prompts by simulate flag
export const getPromptsBySimulate = (simulate: boolean): PromptItem[] => {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => prompt.meta.simulate === simulate);
};

// Get unique tags from all prompts
export const getAllPromptTags = (): string[] => {
  const allPrompts = getAllPrompts();
  const tagsSet = new Set<string>();
  
  allPrompts.forEach(prompt => {
    if (prompt.meta.tags && Array.isArray(prompt.meta.tags)) {
      prompt.meta.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  
  return Array.from(tagsSet).sort();
};
