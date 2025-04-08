import { useState, useEffect, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getAllParsedPrompts, ParsedPrompt } from '@/lib/promptParser';

interface PromptArchiveProps {
  prompts: ParsedPrompt[];
}

export default function PromptArchive({ prompts }: PromptArchiveProps) {
  // State for filtering
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSenders, setSelectedSenders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);

  // Extract all unique tags and senders for filter options
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    prompts.forEach(prompt => {
      if (prompt.tags && prompt.tags.length > 0) {
        prompt.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [prompts]);

  const allSenders = useMemo(() => {
    const senderSet = new Set<string>();
    prompts.forEach(prompt => {
      if (prompt.from) {
        senderSet.add(prompt.from);
      }
    });
    return Array.from(senderSet).sort();
  }, [prompts]);

  // Filter prompts based on selected criteria
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      // Filter by selected tags
      if (selectedTags.length > 0) {
        if (!prompt.tags || !prompt.tags.some(tag => selectedTags.includes(tag))) {
          return false;
        }
      }

      // Filter by selected senders
      if (selectedSenders.length > 0) {
        if (!prompt.from || !selectedSenders.includes(prompt.from)) {
          return false;
        }
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = prompt.title?.toLowerCase().includes(searchLower);
        const matchesContent = prompt.plainText?.toLowerCase().includes(searchLower);
        const matchesSender = prompt.from?.toLowerCase().includes(searchLower);
        const matchesRecipient = prompt.to?.toLowerCase().includes(searchLower);
        
        return matchesTitle || matchesContent || matchesSender || matchesRecipient;
      }

      return true;
    });
  }, [prompts, selectedTags, selectedSenders, searchTerm]);

  // Toggle a tag in the filter
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Toggle a sender in the filter
  const toggleSender = (sender: string) => {
    setSelectedSenders(prev => 
      prev.includes(sender) 
        ? prev.filter(s => s !== sender) 
        : [...prev, sender]
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Toggle expanded view for a prompt
  const toggleExpandPrompt = (id: string) => {
    setExpandedPromptId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Prompt Archive | rolodexterLABS</title>
        <meta name="description" content="Archive of all prompts exchanged between rolodexterGPT and rolodexterVS" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-black hover:text-gray-600 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Prompt Archive</h1>
          <p className="text-gray-600">
            Browse all {prompts.length} prompt exchanges between rolodexterGPT and rolodexterVS
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Filter Prompts</h2>
          
          {/* Search */}
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tag Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {allTags.length === 0 && (
                  <span className="text-sm text-gray-500">No tags available</span>
                )}
              </div>
            </div>
            
            {/* Sender Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Sender</h3>
              <div className="flex flex-wrap gap-2">
                {allSenders.map(sender => (
                  <button
                    key={sender}
                    onClick={() => toggleSender(sender)}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      selectedSenders.includes(sender)
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {sender}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Filter Stats */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPrompts.length} of {prompts.length} prompts
            {(selectedTags.length > 0 || selectedSenders.length > 0 || searchTerm) && (
              <button 
                onClick={() => {
                  setSelectedTags([]);
                  setSelectedSenders([]);
                  setSearchTerm('');
                }}
                className="ml-2 text-black underline hover:no-underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Prompts List */}
        <div className="space-y-6">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map(prompt => (
              <div 
                key={prompt.id} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleExpandPrompt(prompt.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{prompt.title}</h3>
                    <span className="text-xs text-gray-500">{formatDate(prompt.timestamp)}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm">
                    <span className="font-medium">{prompt.from}</span>
                    <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="font-medium">{prompt.to}</span>
                  </div>
                  
                  {/* Preview or Full Content */}
                  <div className={`mt-3 ${expandedPromptId === prompt.id ? '' : 'line-clamp-3'} text-sm text-gray-700`}>
                    {expandedPromptId === prompt.id ? prompt.content : prompt.plainText}
                  </div>
                  
                  {/* Tags */}
                  {prompt.tags && prompt.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {prompt.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTag(tag);
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Metadata */}
                  <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                    {prompt.relatedTask && (
                      <span>Related Task: {prompt.relatedTask}</span>
                    )}
                    <span>Direction: {prompt.direction}</span>
                    <span>File: {prompt.path.split('/').pop()}</span>
                  </div>
                  
                  {/* Expand/Collapse Indicator */}
                  <button 
                    className="mt-2 text-xs font-medium text-black hover:underline focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpandPrompt(prompt.id);
                    }}
                  >
                    {expandedPromptId === prompt.id ? 'Show less' : 'Show more'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No prompts match your current filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prompts = getAllParsedPrompts();
  
  return {
    props: {
      prompts,
    },
    // Revalidate every hour to include new prompts
    revalidate: 3600,
  };
};