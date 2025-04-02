import React from 'react';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import { AgentAttribution } from './AgentAttribution';
import { ThoughtProcess } from './ThoughtProcess';

export interface KnowledgeModuleProps {
  frontMatter: {
    title: string;
    slug: string;
    category: string;
    agent_author: string[];
    agent_curated_by: string[];
    agent_historian: string[];
    last_updated: string;
    status: string;
    summary: string;
    layout: string;
    thought_process: Array<{
      by: string;
      timestamp: string;
      note: string;
    }>;
  };
  mdxSource: any;
}

export const KnowledgeLayout: React.FC<KnowledgeModuleProps> = ({ frontMatter, mdxSource }) => {
  const {
    title,
    category,
    agent_author,
    agent_curated_by,
    agent_historian,
    last_updated,
    summary,
    thought_process
  } = frontMatter;

  const formattedDate = last_updated ? format(new Date(last_updated), 'MMMM d, yyyy') : '';
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 pb-6 border-b border-gray-200">
        <div className="text-sm text-gray-500 mb-2">
          {category.replace('/', ' / ')}
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-6">{summary}</p>
        
        <div className="flex flex-wrap gap-6 mb-6">
          <AgentAttribution label="Authored by" agents={agent_author} />
          <AgentAttribution label="Curated by" agents={agent_curated_by} />
          <AgentAttribution label="History by" agents={agent_historian} />
        </div>
        
        <div className="text-sm text-gray-500">
          Last updated: {formattedDate}
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none mb-12">
        <MDXRemote {...mdxSource} />
      </div>
      
      <div className="mt-12 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Thought Process</h2>
        <ThoughtProcess thoughts={thought_process} />
      </div>
    </div>
  );
};
