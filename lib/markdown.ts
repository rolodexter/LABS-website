import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Sanitize an object by converting all Date objects to ISO strings
 * to prevent Next.js serialization errors
 */
function sanitizeForNextJs(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
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
        result[key] = sanitizeForNextJs(obj[key]);
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
 * Get all prompts
 */
export function getPrompts() {
  const gptToVsPrompts = getMarkdownFiles(PROMPTS_GPT_TO_VS_DIR);
  const vsToGptPrompts = getMarkdownFiles(PROMPTS_VS_TO_GPT_DIR);
  
  return [...gptToVsPrompts, ...vsToGptPrompts];
}

/**
 * Get system sync prompt
 */
export function getSyncPrompt() {
  if (!fs.existsSync(SYNC_PROMPT_PATH)) {
    console.warn(`SYNC_PROMPT.md does not exist`);
    return { content: "System snapshot not available." };
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
  return {
    tasks: getTasks(),
    projects: getProjects(),
    prompts: getPrompts(),
    syncPrompt: getSyncPrompt(),
  };
}
