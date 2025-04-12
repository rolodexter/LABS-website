import React from 'react';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  author?: string;
  category?: string;
}

const MinimalArticleCard: React.FC<ArticleCardProps> = ({
  title,
  slug
}) => {
  return (
    <article className="border-b border-gray-100 py-3">
      <Link href={slug} className="block">
        <h3 className="text-base font-mono hover:underline">{title}</h3>
      </Link>
    </article>
  );
};

export default MinimalArticleCard;
