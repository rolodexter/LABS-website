import React from 'react';
import MinimalArticleCard from './MinimalArticleCard';

// Define the article type
export interface Article {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: 1 | 2 | 3 | 4;
}

const MinimalArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  columns = 2
}) => {
  // Determine grid columns class based on columns prop
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {articles.map((article, index) => (
        <MinimalArticleCard
          key={article.slug || index}
          title={article.title}
          excerpt={article.excerpt}
          date={article.date}
          author={article.author}
          category={article.category}
          slug={article.slug}
        />
      ))}
    </div>
  );
};

export default MinimalArticleGrid;
