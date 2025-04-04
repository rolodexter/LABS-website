import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card } from '@/components/ui';

interface ArticlePreview {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  summary?: string;
  image?: string;
  estimatedReadTime?: string;
  last_updated: string;
  tags?: string[];
}

interface ProductHighlight {
  name: string;
  slug: string;
  description: string;
  image?: string;
  relatedArticles?: string[]; // slugs of related articles
}

interface FeaturedContentProps {
  headline: string;
  subheadline?: string;
  theme?: 'default' | 'scientific' | 'product' | 'service' | 'dark';
  layout?: 'magazine' | 'featured' | 'grid' | 'split';
  mainArticle?: ArticlePreview;
  articles: ArticlePreview[];
  featuredProducts?: ProductHighlight[];
  showCategories?: boolean;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({
  headline,
  subheadline,
  theme = 'default',
  layout = 'magazine',
  mainArticle,
  articles,
  featuredProducts,
  showCategories = true,
}) => {
  // Get unique categories for filtering
  const categories = Array.from(new Set(articles.map(article => article.category)));
  
  // Background and text styles based on theme
  const getBgStyle = () => {
    switch (theme) {
      case 'scientific': return 'bg-gradient-to-r from-gray-50 to-blue-50';
      case 'product': return 'bg-gradient-to-r from-gray-900 to-black';
      case 'service': return 'bg-gradient-to-r from-gray-50 to-green-50';
      case 'dark': return 'bg-black';
      default: return 'bg-white';
    }
  };
  
  const getTextStyle = () => {
    return theme === 'product' || theme === 'dark' ? 'text-white' : 'text-black';
  };
  
  return (
    <section className={`py-12 ${getBgStyle()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${getTextStyle()}`}>{headline}</h2>
          {subheadline && (
            <p className={`mt-4 text-lg ${theme === 'product' || theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {subheadline}
            </p>
          )}
        </div>
        
        {/* Category filters */}
        {showCategories && categories.length > 1 && (
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
            <div className="flex space-x-2">
              <button className={`px-4 py-2 rounded-full whitespace-nowrap ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-black text-white'}`}>
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category} 
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Magazine Layout */}
        {layout === 'magazine' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main featured article - spans 8 columns */}
            {mainArticle && (
              <Card className={`md:col-span-8 relative overflow-hidden group ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
                <div className="aspect-[16/9] relative">
                  {mainArticle.image ? (
                    <Image 
                      src={mainArticle.image} 
                      alt={mainArticle.title} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full ${theme === 'scientific' ? 'bg-blue-100' : theme === 'service' ? 'bg-green-100' : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
                      <span className="text-6xl opacity-20">R</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${theme === 'scientific' ? 'bg-blue-100 text-blue-800' : theme === 'service' ? 'bg-green-100 text-green-800' : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {mainArticle.category}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">{mainArticle.estimatedReadTime}</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${getTextStyle()}`}>{mainArticle.title}</h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {mainArticle.summary}
                  </p>
                  <Link href={`/${mainArticle.slug}`}>
                    <Button className="mt-2">Read More</Button>
                  </Link>
                </div>
              </Card>
            )}
            
            {/* Secondary articles column */}
            <div className="md:col-span-4 space-y-8">
              {articles.slice(0, 3).map((article, index) => (
                <Card key={index} className={`overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${theme === 'scientific' ? 'bg-blue-100 text-blue-800' : theme === 'service' ? 'bg-green-100 text-green-800' : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${getTextStyle()}`}>{article.title}</h3>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {article.summary?.substring(0, 100)}...
                    </p>
                    <Link href={`/${article.slug}`}>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Read More →</span>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Grid layout for additional articles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(3, 9).map((article, index) => (
            <Card key={index} className={`overflow-hidden group ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
              {article.image && (
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${theme === 'scientific' ? 'bg-blue-100 text-blue-800' : theme === 'service' ? 'bg-green-100 text-green-800' : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {article.category}
                  </span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{article.last_updated}</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${getTextStyle()}`}>{article.title}</h3>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.summary?.substring(0, 80)}...
                </p>
                <div className="flex justify-between items-center">
                  <Link href={`/${article.slug}`}>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Read More →</span>
                  </Link>
                  {article.estimatedReadTime && (
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{article.estimatedReadTime}</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Related Products Section */}
        {featuredProducts && featuredProducts.length > 0 && (
          <div className="mt-16">
            <h3 className={`text-2xl font-bold mb-6 ${getTextStyle()}`}>
              Related Products & Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <Card 
                  key={index} 
                  className={`p-6 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-300`}
                >
                  {product.image && (
                    <div className="mb-4">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={80} 
                        height={80} 
                        className="rounded"
                      />
                    </div>
                  )}
                  <h4 className={`text-xl font-semibold mb-2 ${getTextStyle()}`}>{product.name}</h4>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {product.description}
                  </p>
                  <Link href={`/products/${product.slug}`}>
                    <Button 
                      variant={theme === 'dark' ? 'outline' : 'secondary'} 
                      className="text-sm"
                    >
                      Learn More
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* "View All" button */}
        <div className="mt-12 text-center">
          <Link href="/knowledge">
            <Button 
              variant={theme === 'dark' ? 'outline' : 'primary'} 
              className="px-8 py-3"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;