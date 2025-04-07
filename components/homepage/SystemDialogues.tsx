import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import PromptCard from './PromptCard';

// Type definitions
interface PromptExchange {
  id: string;
  title?: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  tags?: string[];
  relatedTask?: string;
}

interface PromptThread {
  initialPrompt: PromptExchange;
  response: PromptExchange | undefined;
}

const SystemDialogues: React.FC<{ prompts: PromptExchange[] }> = ({ prompts }) => {
  
  // Build threads by matching responses to initial prompts
  const buildPromptThreads = (prompts: PromptExchange[]): PromptThread[] => {
    const threads: PromptThread[] = [];
    const responseMap = new Map<string, PromptExchange>();
    
    // First, identify all responses (they have IDs with "-response" suffix)
    prompts.forEach(prompt => {
      if (prompt.id.endsWith('-response')) {
        const initialId = prompt.id.replace('-response', '');
        responseMap.set(initialId, prompt);
      }
    });
    
    // Then create threads with their responses
    prompts.forEach(prompt => {
      if (!prompt.id.endsWith('-response')) {
        threads.push({
          initialPrompt: prompt,
          response: responseMap.get(prompt.id)
        });
      }
    });
    
    // Sort by timestamp (newest first)
    return threads.sort((a, b) => {
      const dateA = new Date(a.initialPrompt.timestamp);
      const dateB = new Date(b.initialPrompt.timestamp);
      return dateB.getTime() - dateA.getTime();
    });
  };
  
  const promptThreads = buildPromptThreads(prompts);
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return format(date, 'yyyy-MM-dd HH:mm');
    } catch (e) {
      return timestamp;
    }
  };
  
  // Extract title from content
  const getPromptTitle = (prompt: PromptExchange) => {
    if (prompt.title) return prompt.title;
    
    // Try to extract a title from the content
    const lines = prompt.content.split('\n');
    const headingMatch = lines.find(line => line.startsWith('# ') || line.startsWith('## '));
    
    if (headingMatch) {
      return headingMatch.replace(/^#+ /, '');
    }
    
    // Fallback to first line or ID
    return lines[0] || prompt.id;
  };
  
  return (
    <section className="my-12">
      <div className="border-b border-gray-200 pb-2 mb-8">
        <h2 className="text-2xl font-serif font-normal">System Dialogues</h2>
        <p className="text-sm text-gray-600 mt-1 font-mono">
          Recorded communications between rolodexter agents across projects
        </p>
      </div>
      
      <div className="space-y-6 mt-8">
        {promptThreads.slice(0, 5).map(thread => {
          // Convert timestamps to Date objects and ensure required fields
          const promptData = {
            ...thread.initialPrompt,
            title: thread.initialPrompt.title || `Prompt from ${thread.initialPrompt.from} to ${thread.initialPrompt.to}`,
            timestamp: new Date(thread.initialPrompt.timestamp)
          };
          
          const responseData = thread.response ? {
            id: thread.response.id,
            from: thread.response.from,
            content: thread.response.content,
            timestamp: new Date(thread.response.timestamp)
          } : undefined;
          
          return (
            <PromptCard 
              key={thread.initialPrompt.id}
              prompt={promptData}
              response={responseData}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SystemDialogues;
