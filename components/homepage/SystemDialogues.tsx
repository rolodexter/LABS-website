import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

// Type definitions
interface PromptExchange {
  id: string;
  from: 'rolodexterGPT' | 'rolodexterVS' | string;
  to: 'rolodexterGPT' | 'rolodexterVS' | string;
  timestamp: string;
  relatedTask?: string;
  relatedProject?: string;
  tags: string[];
  content: string;
  title?: string;
}

interface PromptThread {
  initialPrompt: PromptExchange;
  response?: PromptExchange;
}

const SystemDialogues: React.FC<{ prompts: PromptExchange[] }> = ({ prompts }) => {
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  
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
    return threads.sort((a, b) => 
      new Date(b.initialPrompt.timestamp).getTime() - 
      new Date(a.initialPrompt.timestamp).getTime()
    );
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
        <h2 className="text-2xl font-serif font-normal">System Dialogues (Live)</h2>
        <p className="text-sm text-gray-600 mt-1 font-mono">
          Agent collaboration logs from the rolodexterLABS ecosystem
        </p>
      </div>
      
      <div className="space-y-8">
        {promptThreads.map((thread) => (
          <div 
            key={thread.initialPrompt.id}
            className={`border-l-2 ${
              thread.initialPrompt.from === 'rolodexterGPT' 
                ? 'border-black' 
                : 'border-gray-400'
            } pl-4 py-1 transition-all duration-200 hover:bg-gray-50`}
          >
            <div 
              className="cursor-pointer" 
              onClick={() => setExpandedThread(
                expandedThread === thread.initialPrompt.id ? null : thread.initialPrompt.id
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {getPromptTitle(thread.initialPrompt)}
                </h3>
                <span className="text-xs font-mono text-gray-500">
                  {formatTimestamp(thread.initialPrompt.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
                <span className="font-mono">{thread.initialPrompt.from}</span>
                <span>→</span>
                <span className="font-mono">{thread.initialPrompt.to}</span>
                
                {thread.initialPrompt.relatedTask && (
                  <>
                    <span className="text-gray-400">|</span>
                    <Link 
                      href={`/system/tasks/${thread.initialPrompt.relatedTask}`}
                      className="hover:underline font-mono"
                    >
                      {thread.initialPrompt.relatedTask}
                    </Link>
                  </>
                )}
              </div>
              
              {thread.initialPrompt.tags && thread.initialPrompt.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {thread.initialPrompt.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-block text-xs bg-gray-100 px-1.5 py-0.5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {expandedThread === thread.initialPrompt.id && (
              <div className="mt-4 text-sm">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-mono text-xs bg-gray-50 p-3 border border-gray-200">
                    {thread.initialPrompt.content}
                  </pre>
                </div>
                
                {thread.response && (
                  <div className="mt-6 ml-6 border-l-2 border-gray-300 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        Response from {thread.response.from}
                      </h4>
                      <span className="text-xs font-mono text-gray-500">
                        {formatTimestamp(thread.response.timestamp)}
                      </span>
                    </div>
                    
                    <div className="prose prose-sm max-w-none mt-2">
                      <pre className="whitespace-pre-wrap font-mono text-xs bg-gray-50 p-3 border border-gray-200">
                        {thread.response.content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemDialogues;
