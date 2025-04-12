import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  slug: string;
}

const NewFeaturedArticle: React.FC<FeaturedArticleProps> = ({
  title,
  excerpt,
  date,
  author,
  category,
  imageUrl,
  slug
}) => {
  return (
    <motion.article 
      className="border-2 border-lab-black bg-lab-white relative"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Link href={slug} className="block">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image 
            src={imageUrl || '/placeholder-image.jpg'} 
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute top-0 left-0 bg-lab-black text-lab-white px-3 py-1">
            <span className="font-mono text-xs uppercase tracking-wider">{category}</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="article-meta mb-2">
            <span>{date}</span> • <span>{author}</span>
          </div>
          
          <h3 className="article-title mb-3">{title}</h3>
          
          <p className="article-excerpt">{excerpt}</p>
          
          <div className="mt-4 font-mono text-sm flex items-center">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default NewFeaturedArticle;
