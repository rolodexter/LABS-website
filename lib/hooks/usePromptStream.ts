import { useState, useEffect } from 'react';
import {
  getAllPromptFiles,
  formatPromptsForChat,
  stripMarkdown,
  ParsedPrompt,
} from '../promptParser';

// Types for the hook
interface PromptMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  tags?: string[];
  path?: string;
  fullContent?: string;
}

interface PromptStreamOptions {
  contentPath?: string;
  reverseOrder?: boolean;
  maxMessages?: number;
  filterAgents?: string[];
}

interface PromptStreamResult {
  messages: PromptMessage[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch and process prompts for chat display
 *
 * @param options Options for customizing prompt stream behavior
 * @returns Object containing messages, loading state, and any errors
 */
export const usePromptStream = (options: PromptStreamOptions = {}): PromptStreamResult => {
  const {
    contentPath = 'content/system/prompts',
    reverseOrder = true,
    maxMessages = 0, // 0 means no limit
    filterAgents = [],
  } = options;

  const [messages, setMessages] = useState<PromptMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoading(true);

        // Get all prompt files
        const allPrompts = getAllPromptFiles(contentPath);

        // Filter by sender/agent if specified
        const filteredPrompts =
          filterAgents.length > 0
            ? allPrompts.filter(prompt =>
                filterAgents.some(agent => prompt.from.includes(agent) || prompt.to.includes(agent))
              )
            : allPrompts;

        // Prepare messages for chat display
        let chatMessages = filteredPrompts.map(prompt => ({
          id: prompt.id || `prompt-${prompt.timestamp}`,
          sender: prompt.from,
          content: prompt.plainText || stripMarkdown(prompt.content || ''),
          timestamp: new Date(prompt.timestamp),
          tags: prompt.tags || [],
          path: prompt.path,
          fullContent: prompt.content,
        }));

        // Sort by timestamp (reverse chronological if specified)
        chatMessages = chatMessages.sort((a, b) => {
          const comparison = a.timestamp.getTime() - b.timestamp.getTime();
          return reverseOrder ? -comparison : comparison;
        });

        // Limit the number of messages if specified
        if (maxMessages > 0) {
          chatMessages = chatMessages.slice(0, maxMessages);
        }

        setMessages(chatMessages);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching prompts:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, [contentPath, reverseOrder, maxMessages, filterAgents.join(',')]);

  return { messages, isLoading, error };
};

export default usePromptStream;
