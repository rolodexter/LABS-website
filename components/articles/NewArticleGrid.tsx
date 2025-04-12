import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Article {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
}

const NewArticleGrid: React.FC<ArticleGridProps> = ({ 
  articles, 
  columns = 2 
}) => {
  // Animation variants for staggered animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Determine grid columns class based on prop
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {articles.map((article, index) => (
        <motion.article 
          key={`${article.slug}-${index}`}
          variants={itemVariants}
          className="border border-lab-black bg-lab-white hover:bg-lab-offwhite transition-colors duration-300"
        >
          <Link href={article.slug} className="block p-6">
            <div className="article-meta mb-2">
              <span className="mr-2">{article.date}</span>
              <span className="inline-block bg-lab-black text-lab-white px-2 py-0.5 text-xs font-mono uppercase">
                {article.category}
              </span>
            </div>
            
            <h3 className="font-display font-bold text-lg leading-tight mb-2">{article.title}</h3>
            
            <p className="font-serif text-lab-gray-700 mb-3 line-clamp-2">{article.excerpt}</p>
            
            <div className="flex justify-between items-center mt-4">
              <span className="font-mono text-xs text-lab-gray-600">{article.author}</span>
              
              <div className="font-mono text-sm flex items-center">
                <span>Read</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
};

export default NewArticleGrid;
