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

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
  showExcerpt?: boolean;
  showCategory?: boolean;
  showReadTime?: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  columns = 3,
  showExcerpt = true,
  showCategory = true,
  showReadTime = true,
}) => {
  // Determine grid columns class based on columns prop
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {articles.map((article) => (
        <article key={article.id} className="group">
          <Link href={`/articles/${article.slug}`} className="block">
            {article.image && (
              <div className="relative aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            
            {showCategory && (
              <div className="text-xs uppercase tracking-wider mb-1 font-medium">
                {article.category}
              </div>
            )}
            
            <h3 className="font-serif text-xl font-bold mb-2 group-hover:underline">
              {article.title}
            </h3>
            
            {showExcerpt && (
              <p className="text-gray-700 mb-2 line-clamp-2">{article.excerpt}</p>
            )}
            
            <div className="flex items-center text-sm text-gray-500">
              <time dateTime={article.publishDate}>
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              
              {showReadTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </>
              )}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleGrid;
