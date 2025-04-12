import React, { useState, useEffect } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { motion } from 'framer-motion';

interface KnowledgePreviewProps {
  content?: string;
}

// Mock content for preview when no content is provided
const MOCK_CONTENT = `---
title: Knowledge Graph Visualization
category: Technology
subcategory: Visualization
complexity: Intermediate
status: Published
version: 1.0.0
last_updated: April 2, 2025
tags: [knowledge-graph, visualization, connections]
---

# Knowledge Graph Visualization

A knowledge graph is a network of entities, their semantic types, properties, and relationships. 
This visualization demonstrates how concepts are interconnected within the rolodexterLA BS ecosystem.

## Key Components

- **Nodes**: Represent entities (articles, concepts, agents)
- **Edges**: Represent relationships between entities
- **Clusters**: Groups of related entities

## Implementation

The visualization uses a force-directed graph layout to position nodes based on their relationships.
This creates an organic representation of knowledge connections.
`;

export default function NewKnowledgePreview({ content }: KnowledgePreviewProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    const processMdx = async () => {
      try {
        // Use mock content if none provided
        const contentToProcess = content || MOCK_CONTENT;
        
        // Parse frontmatter
        const { data, content: mdxContent } = matter(contentToProcess);
        setMetadata(data);

        // Serialize MDX content
        const mdxSource = await serialize(mdxContent, {
          parseFrontmatter: false, // Already parsed above
          mdxOptions: {
            development: process.env.NODE_ENV === 'development'
          }
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error('Error processing MDX:', error);
      }
    };

    processMdx();
  }, [content]);

  if (!mdxSource || !metadata) {
    return (
      <div className="flex justify-center items-center h-64 border border-lab-black">
        <div className="font-mono text-sm">Loading knowledge preview...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="knowledge-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Metadata Section */}
      <div className="border-b border-lab-black p-6 mb-6">
        <h2 className="font-display text-2xl font-bold mb-4">{metadata.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="font-mono">
            <span className="text-lab-gray-600">Category:</span> {metadata.category}
            {metadata.subcategory && ` / ${metadata.subcategory}`}
          </div>
          <div className="font-mono">
            <span className="text-lab-gray-600">Complexity:</span> {metadata.complexity}
          </div>
          <div className="font-mono">
            <span className="text-lab-gray-600">Status:</span> {metadata.status}
          </div>
          <div className="font-mono">
            <span className="text-lab-gray-600">Last Updated:</span> {metadata.last_updated}
          </div>
          {metadata.tags && (
            <div className="col-span-1 md:col-span-2 mt-2">
              <span className="text-lab-gray-600 font-mono">Tags:</span>{' '}
              {metadata.tags.map((tag: string) => (
                <span key={tag} className="inline-block border border-lab-black px-2 py-0.5 text-xs font-mono mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-black max-w-none p-6">
        <MDXRemote {...mdxSource} />
      </div>
      
      {/* Knowledge Graph Visualization Placeholder */}
      <div className="mt-8 border-t border-lab-black pt-8 p-6">
        <h3 className="font-mono text-lg font-bold mb-4">Knowledge Connections</h3>
        <div className="bg-lab-offwhite border border-lab-black h-64 flex items-center justify-center">
          <p className="font-mono text-sm text-lab-gray-600">
            Interactive knowledge graph visualization would appear here
          </p>
        </div>
      </div>
    </motion.div>
  );
}
