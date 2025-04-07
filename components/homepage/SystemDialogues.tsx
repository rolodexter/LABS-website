import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

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
  const [isHoveringThread, setIsHoveringThread] = useState<string | null>(null);
  
  // Check if device is touch-based (mobile/tablet)
  const isTouchDevice = useMediaQuery({ query: '(hover: none)' });
  
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
        <h2 className="text-2xl font-serif font-normal">System Dialogues</h2>
        <p className="text-sm text-gray-600 mt-1 font-mono">
          Recorded communications between rolodexter agents across projects
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
            } pl-4 py-1 transition-all duration-300 ${expandedThread === thread.initialPrompt.id ? 'bg-gray-50' : ''} ${isHoveringThread === thread.initialPrompt.id ? 'bg-gray-50' : ''}`}
            onMouseEnter={() => !isTouchDevice && setIsHoveringThread(thread.initialPrompt.id)}
            onMouseLeave={() => !isTouchDevice && setIsHoveringThread(null)}
          >
            <div 
              className="cursor-pointer" 
              onClick={() => setExpandedThread(
                expandedThread === thread.initialPrompt.id ? null : thread.initialPrompt.id
              )}
              aria-expanded={expandedThread === thread.initialPrompt.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setExpandedThread(
                    expandedThread === thread.initialPrompt.id ? null : thread.initialPrompt.id
                  );
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {getPromptTitle(thread.initialPrompt)}
                </h3>
                <span className="text-xs font-mono text-black">
                  {formatTimestamp(thread.initialPrompt.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-black mt-1 space-x-2">
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
                      className="inline-block text-xs bg-gray-100 px-1.5 py-0.5 font-mono text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {(expandedThread === thread.initialPrompt.id || (!isTouchDevice && isHoveringThread === thread.initialPrompt.id)) && (
              <div className="mt-4 animate-fadeIn overflow-hidden">
                <div className="prose max-w-none animate-slideUp">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-white p-4 border border-gray-300 text-black leading-relaxed">
                    {thread.initialPrompt.content}
                  </pre>
                </div>
                
                {thread.response && (
                  <div className="mt-6 ml-6 border-l-2 border-black pl-4 animate-delayFadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base text-black">
                        Response from {thread.response.from}
                      </h4>
                      <span className="text-xs font-mono text-black">
                        {formatTimestamp(thread.response.timestamp)}
                      </span>
                    </div>
                    
                    <div className="prose max-w-none animate-slideUp">
                      <pre className="whitespace-pre-wrap font-mono text-sm bg-white p-4 border border-gray-300 text-black leading-relaxed">
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
