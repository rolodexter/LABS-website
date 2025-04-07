import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';

// Constants
const PROMPT_GPT_TO_VS_DIR = path.join(process.cwd(), 'content/system/prompts/gpt-to-vs');
const PROMPT_VS_TO_GPT_DIR = path.join(process.cwd(), 'content/system/prompts/vs-to-gpt');

// Types for parsed prompt data
export interface PromptMetadata {
  id: string;
  from: string;
  to: string;
  timestamp: string;
  related_task?: string;
  related_project?: string;
  tags?: string[];
  visibility?: 'public' | 'private';
  simulate?: boolean;
  title?: string;
}

export interface ParsedPrompt {
  id: string;
  title?: string;
  timestamp: string;
  from: string;
  to: string;
  content: string;
  plainText: string;
  tags: string[];
  relatedTask?: string | null; // Updated to allow null explicitly
  path: string;
  simulate?: boolean; // Whether this prompt should be included in simulations
  direction?: string; // Direction of the prompt (gpt-to-vs or vs-to-gpt)
}

/**
 * Strip markdown formatting from text while preserving the content structure
 * for clean display in the UI
 */
export function stripMarkdown(text: string): string {
  if (!text) return '';

  return (
    text
      // Remove headers but preserve content
      .replace(/^#+\s+(.+)$/gm, '$1')
      // Remove bold/italic but preserve content
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/__(.+?)__/g, '$1')
      .replace(/_(.+?)_/g, '$1')
      // Remove links but keep text
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      // Remove code blocks but preserve code content
      .replace(/```(?:[^\n]+)?\n([\s\S]*?)```/g, '$1')
      // Remove inline code formatting but preserve content
      .replace(/`(.+?)`/g, '$1')
      // Remove blockquotes formatting but keep content
      .replace(/^>\s+(.+)$/gm, '$1')
      // Remove horizontal rules
      .replace(/^\s*-{3,}\s*$/gm, '')
      // Replace multiple newlines with double newline for paragraph separation
      .replace(/\n{3,}/g, '\n\n')
      // Trim whitespace
      .trim()
  );
}

/**
 * Get all available prompt files from both directories
 * This is useful for debugging or quickly accessing file paths
 */
export function getAllPromptFilePaths(): string[] {
  const gptToVsFiles = fs.existsSync(PROMPT_GPT_TO_VS_DIR)
    ? fs
        .readdirSync(PROMPT_GPT_TO_VS_DIR)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(PROMPT_GPT_TO_VS_DIR, file))
    : [];

  const vsToGptFiles = fs.existsSync(PROMPT_VS_TO_GPT_DIR)
    ? fs
        .readdirSync(PROMPT_VS_TO_GPT_DIR)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(PROMPT_VS_TO_GPT_DIR, file))
    : [];

  return [...gptToVsFiles, ...vsToGptFiles];
}

/**
 * Extract a preview snippet from prompt content
 */
export function getPromptPreview(content: string, maxLength = 150): string {
  // Clean up the markdown and get meaningful text
  const cleanText = stripMarkdown(content);

  // Find first paragraph or content
  const firstParagraph = cleanText.split('\n\n')[0] || cleanText;

  // Truncate if needed
  if (firstParagraph.length > maxLength) {
    return firstParagraph.substring(0, maxLength) + '...';
  }

  return firstParagraph;
}

/**
 * Parse a prompt file and extract structured data
 */
export function parsePromptFile(filePath: string): ParsedPrompt | null {
  if (!fs.existsSync(filePath)) {
    console.warn(`File does not exist: ${filePath}`);
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Extract values from frontmatter
    const {
      id,
      title,
      timestamp,
      from,
      to,
      tags = [], // Default to empty array
      related_task: relatedTask = null, // Default to null for proper serialization
      simulate = true, // Default to true for workstream simulation
      direction = filePath.includes('gpt-to-vs') ? 'gpt-to-vs' : 'vs-to-gpt', // Infer direction from path if not specified
    } = data;

    // Only process files with proper metadata
    if (!from || !to) {
      console.warn(`Prompt file missing required sender/recipient metadata: ${filePath}`);
      return null;
    }

    // Use file modification date as fallback if timestamp not in frontmatter
    const promptTimestamp =
      timestamp ||
      (() => {
        try {
          const stats = fs.statSync(filePath);
          return stats.mtime.toISOString();
        } catch (e) {
          return new Date().toISOString();
        }
      })();

    // Strip markdown and extract clean text for display
    const plainText = stripMarkdown(content);

    // Extract filename from path for simplified ID if none provided
    const filename = path.basename(filePath, '.md');

    return {
      id: id || filename,
      title: title || `${from} → ${to}`, // Generate title if not provided
      timestamp: promptTimestamp,
      from,
      to,
      content,
      plainText,
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : [],
      relatedTask: relatedTask, // Explicitly pass through, will be null if not set
      path: filePath,
      simulate,
      direction,
    };
  } catch (error) {
    console.error(`Error parsing prompt file: ${filePath}`, error);
    return null;
  }
}

/**
 * Get all prompts from both directories, parsed into structured format
 */
export function getAllParsedPrompts(): ParsedPrompt[] {
  const prompts: ParsedPrompt[] = [];
  const filePaths = getAllPromptFilePaths();

  filePaths.forEach(filePath => {
    const parsed = parsePromptFile(filePath);
    if (parsed) {
      prompts.push(parsed);
    }
  });

  // Sort by timestamp (most recent first)
  return prompts.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get all prompt files from the system directories
 */
export function getAllPromptFiles(baseContentPath = 'content/system/prompts'): ParsedPrompt[] {
  const basePath = path.join(process.cwd(), baseContentPath);
  const gptToVsPath = path.join(basePath, 'gpt-to-vs');
  const vsToGptPath = path.join(basePath, 'vs-to-gpt');

  const prompts: ParsedPrompt[] = [];

  // Helper to read prompt directory
  const readPromptDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) return [];

    return fs
      .readdirSync(dirPath)
      .filter(file => file.endsWith('.md'))
      .map(file => parsePromptFile(path.join(dirPath, file)))
      .filter(Boolean) as ParsedPrompt[];
  };

  // Get all prompts from both directories
  const gptToVsPrompts = readPromptDir(gptToVsPath);
  const vsToGptPrompts = readPromptDir(vsToGptPath);

  // Combine and sort by timestamp
  return [...gptToVsPrompts, ...vsToGptPrompts]
    .filter(prompt => prompt.simulate !== false) // Only include prompts marked for simulation
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

/**
 * Format prompts into chat message format for the SimulatedChat component
 */
export function formatPromptsForChat(prompts: ParsedPrompt[]) {
  return prompts
    .filter(prompt => prompt.simulate !== false) // Only include prompts marked for simulation
    .map(prompt => ({
      id: prompt.id || null,
      sender: prompt.from || null,
      content: prompt.plainText || '',
      timestamp: prompt.timestamp ? new Date(prompt.timestamp) : new Date(),
      tags: prompt.tags || [],
      path: prompt.path || null,
      relatedTask: prompt.relatedTask || null, // Ensure relatedTask is properly handled
      fullContent: prompt.content || '', // Include original markdown for modal/expanded view
    }));
}

/**
 * Get all simulatable prompts formatted for chat display
 */
export function getPromptChatMessages(baseContentPath = 'content/system/prompts') {
  const allPrompts = getAllPromptFiles(baseContentPath);

  // Filter to only include prompts that should be simulated
  // And ensure we have all necessary fields for display
  const validPrompts = allPrompts.filter(prompt => {
    return (
      prompt.simulate !== false &&
      prompt.from &&
      prompt.to &&
      prompt.content &&
      // Make sure the prompt is either from rolodexterGPT or rolodexterVS
      (prompt.from === 'rolodexterGPT' || prompt.from === 'rolodexterVS')
    );
  });

  return formatPromptsForChat(validPrompts);
}
