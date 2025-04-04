import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  category: string;
  subcategory?: string;
  tags: string[];
  featured?: boolean;
  priority?: number;
  image?: string;
  author?: string;
}

interface FeaturedArticleProps {
  article: Article;
  size: 'small' | 'medium' | 'large';
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article, size }) => {
  // Different styling based on size
  const containerClasses = {
    small: 'group',
    medium: 'group',
    large: 'group flex flex-col',
  }[size];

  const imageClasses = {
    small: 'aspect-[16/9] mb-3',
    medium: 'aspect-[16/9] mb-4',
    large: 'aspect-[16/9] mb-5',
  }[size];

  const titleClasses = {
    small: 'font-serif text-xl font-bold mb-2 group-hover:underline',
    medium: 'font-serif text-2xl font-bold mb-3 group-hover:underline',
    large: 'font-serif text-3xl md:text-4xl font-bold mb-3 group-hover:underline',
  }[size];

  return (
    <article className={containerClasses}>
      <Link href={`/articles/${article.slug}`} className="block">
        {article.image && (
          <div className={`relative ${imageClasses} overflow-hidden bg-gray-100`}>
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white px-3 py-1 text-xs uppercase tracking-wider">
              {article.category}
            </div>
          </div>
        )}
        
        <h3 className={titleClasses}>
          {article.title}
        </h3>
        
        <p className="text-gray-700 mb-3 line-clamp-3">{article.excerpt}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <time dateTime={article.publishDate}>
            {new Date(article.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{article.readTime}</span>
        </div>
      </Link>
    </article>
  );
};

export default FeaturedArticle;
