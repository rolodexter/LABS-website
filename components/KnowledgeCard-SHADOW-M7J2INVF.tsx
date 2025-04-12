import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type KnowledgeCardProps = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  excerpt: string;
  lastUpdated: string;
  readingTime: number;
  className?: string;
  tags?: string[];
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  agent_author?: string;
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  title,
  slug,
  category,
  summary,
  excerpt,
  lastUpdated,
  readingTime,
  className = '',
  tags = [],
  complexity = 'intermediate',
  featured = false,
  agent_author,
}) => {
  // Helper function to get complexity display
  const getComplexityDisplay = () => {
    switch (complexity) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return 'Intermediate';
    }
  };
  
  // Get category display name and format date
  const categoryDisplay = category.split('/').pop() || category;
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  // Clean up slug
  const cleanSlug = slug.replace(/^\/knowledge\//, '').replace(/^knowledge\//, '').replace(/^\//, '');
  
  return (
    <motion.article 
      className={`article-card p-0 ${featured ? 'article-card--featured' : ''} ${className}`}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link href={`/knowledge/${cleanSlug}`} className="block h-full">
        <div className="p-6 md:p-8 h-full flex flex-col">
          {/* Category and complexity */}
          <div className="article-meta flex justify-between mb-3">
            <span>{categoryDisplay}</span>
            <span>{readingTime} min read</span>
          </div>
          
          {/* Title */}
          <h3 className="article-title mb-3">{title}</h3>
          
          {/* Summary */}
          <p className="article-excerpt mb-4">{summary}</p>
          
          {/* Agent author if present */}
          {agent_author && (
            <div className="mt-auto pt-4 border-t border-lab-gray-200 font-mono text-xs text-lab-gray-600 uppercase tracking-wider">
              By {agent_author}
            </div>
          )}
          
          {/* Footer with date */}
          <div className="mt-auto pt-4 border-t border-lab-gray-200 font-mono text-xs text-lab-gray-600 flex justify-between items-center">
            <span>{formattedDate}</span>
            {complexity && (
              <span className="px-2 py-1 bg-lab-gray-100">{getComplexityDisplay()}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default KnowledgeCard;
