import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { stripMarkdown, getAllParsedPrompts, parsePromptFile } from './promptParser';

/**
 * Sanitize an object by converting all Date objects to ISO strings
 * and handling undefined values to prevent Next.js serialization errors
 */
function sanitizeForNextJs(obj: any): any {
  // Return null for undefined values (Next.js can serialize null but not undefined)
  if (obj === undefined) {
    return null;
  }

  // Pass null through directly
  if (obj === null) {
    return null;
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForNextJs(item));
  }

  if (typeof obj === 'object') {
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Skip undefined values entirely instead of including them as properties
        const value = obj[key];
        if (value !== undefined) {
          result[key] = sanitizeForNextJs(value);
        }
      }
    }
    return result;
  }

  return obj;
}

// Paths
const SYSTEM_DIR = path.join(process.cwd(), 'content/system');
const TASKS_DIR = path.join(SYSTEM_DIR, 'tasks');
const PROJECTS_DIR = path.join(SYSTEM_DIR, 'projects');
const PROMPTS_GPT_TO_VS_DIR = path.join(SYSTEM_DIR, 'prompts/gpt-to-vs');
const PROMPTS_VS_TO_GPT_DIR = path.join(SYSTEM_DIR, 'prompts/vs-to-gpt');
const SYNC_PROMPT_PATH = path.join(SYSTEM_DIR, 'SYNC_PROMPT.md');

/**
 * Parse markdown files from a directory
 */
export function getMarkdownFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    console.warn(`Directory does not exist: ${directory}`);
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

  return markdownFiles.map(fileName => {
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return sanitizeForNextJs({
      path: fullPath,
      content,
      ...data,
    });
  });
}

/**
 * Get all tasks
 */
export function getTasks() {
  return getMarkdownFiles(TASKS_DIR);
}

/**
 * Get all projects
 */
export function getProjects() {
  return getMarkdownFiles(PROJECTS_DIR);
}

/**
 * Get all prompts using the enhanced promptParser utility
 * This ensures we're using authentic markdown files from the system
 */
export function getPrompts() {
  try {
    // Use the getAllParsedPrompts function from promptParser
    // which properly handles frontmatter, markdown parsing and directory access
    const allPrompts = getAllParsedPrompts();

    // Ensure all prompts have required fields for serialization
    const sanitizedPrompts = allPrompts.map(prompt => {
      // Create a new object with all properties converted from undefined to null
      const sanitizedPrompt: Record<string, any> = {};

      // For each potential property, either use its value or null if undefined
      sanitizedPrompt.id = prompt.id ?? null;
      sanitizedPrompt.title = prompt.title ?? null;
      sanitizedPrompt.from = prompt.from ?? null;
      sanitizedPrompt.to = prompt.to ?? null;
      sanitizedPrompt.content = prompt.content ?? null;
      sanitizedPrompt.timestamp = prompt.timestamp ?? null;
      sanitizedPrompt.tags = prompt.tags ?? null;
      sanitizedPrompt.relatedTask = prompt.relatedTask ?? null;
      sanitizedPrompt.plainText = prompt.plainText ?? null;
      sanitizedPrompt.path = prompt.path ?? null;

      return sanitizedPrompt;
    });

    // Apply the general sanitizer as a final step
    return sanitizeForNextJs(sanitizedPrompts);
  } catch (error) {
    console.error('Error loading prompts:', error);
    return [];
  }
}

/**
 * Get system sync prompt
 */
export function getSyncPrompt() {
  if (!fs.existsSync(SYNC_PROMPT_PATH)) {
    console.warn(`SYNC_PROMPT.md does not exist`);
    return { content: 'System snapshot not available.' };
  }

  const fileContents = fs.readFileSync(SYNC_PROMPT_PATH, 'utf8');
  const { data, content } = matter(fileContents);

  return sanitizeForNextJs({
    content,
    ...data,
  });
}

/**
 * Get all homepage data at once
 */
export function getHomepageData() {
  // Get prompts first to ensure they're available even if other data sources fail
  const authenticPrompts = getPrompts();

  return {
    tasks: getTasks(),
    projects: getProjects(),
    prompts: authenticPrompts,
    syncPrompt: getSyncPrompt(),
  };
}
