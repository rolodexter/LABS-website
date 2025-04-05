import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import DailyFocus from '@/components/home/DailyFocus';
import ArticleGrid from '@/components/articles/ArticleGrid';
import FeaturedArticle from '@/components/articles/FeaturedArticle';
import SearchBar from '@/components/ui/SearchBar';

// Types
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

interface DailyConfiguration {
  date: string;
  focusTitle: string;
  focusDescription: string;
  primaryCategory: string;
  featuredArticleIds: string[];
  layout: 'standard' | 'featured' | 'grid' | 'magazine';
  sections: {
    title: string;
    type: 'latest' | 'category' | 'tag' | 'curated';
    value: string;
    limit: number;
  }[];
}

export default function Home() {
  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [dailyConfig, setDailyConfig] = useState<DailyConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch daily configuration and articles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // This would be an API call in production
        // For now, we'll use mock data
        const mockDailyConfig: DailyConfiguration = {
          date: '2025-04-02',
          focusTitle: 'AI Governance & Ethics',
          focusDescription: 'Exploring the frameworks needed for responsible AI development',
          primaryCategory: 'research',
          featuredArticleIds: ['article-001', 'article-002', 'article-003'],
          layout: 'magazine',
          sections: [
            {
              title: 'Latest Research',
              type: 'category',
              value: 'research',
              limit: 6
            },
            {
              title: 'rolodexterGPT Updates',
              type: 'tag',
              value: 'rolodexterGPT',
              limit: 3
            },
            {
              title: 'Editor\'s Picks',
              type: 'curated',
              value: 'editors-picks',
              limit: 4
            }
          ]
        };

        // Mock articles data
        const mockArticles: Article[] = [
          {
            id: 'article-001',
            title: 'The Future of Human-AI Collaboration',
            slug: 'future-human-ai-collaboration',
            excerpt: 'How rolodexterGPT is redefining the boundaries between human creativity and machine intelligence.',
            publishDate: '2025-04-02',
            lastUpdated: '2025-04-02',
            readTime: '8 min',
            category: 'research',
            subcategory: 'ai-collaboration',
            tags: ['rolodexterGPT', 'collaboration', 'future-of-work'],
            featured: true,
            priority: 1,
            image: '/images/articles/ai-collaboration.jpg'
          },
          // Additional mock articles would be here
        ];

        setDailyConfig(mockDailyConfig);
        setArticles(mockArticles);
        
        // Set featured articles based on config
        const featured = mockArticles.filter(article => 
          mockDailyConfig.featuredArticleIds.includes(article.id)
        );
        setFeaturedArticles(featured);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-2xl font-serif">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>rolodexterLABS | Knowledge Hub</title>
        <meta name="description" content="The latest research, insights, and updates from rolodexterLABS" />
      </Head>

      <main className="min-h-screen bg-white text-black">
        {/* Top Navigation Bar */}
        <div className="border-b border-gray-200 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="font-serif text-2xl font-bold">
                rolodexterLABS
              </Link>
            </div>
            <SearchBar />
          </div>
        </div>

        {/* Daily Focus Header */}
        {dailyConfig && (
          <DailyFocus
            title={dailyConfig.focusTitle}
            description={dailyConfig.focusDescription}
            date={dailyConfig.date}
          />
        )}

        {/* Featured Content Section */}
        {featuredArticles.length > 0 && (
          <section className="py-10 border-b border-gray-200">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Featured Article */}
                <FeaturedArticle article={featuredArticles[0]} size="large" />
                
                {/* Secondary Featured Articles */}
                <div className="grid grid-cols-1 gap-6">
                  {featuredArticles.slice(1, 3).map((article) => (
                    <FeaturedArticle key={article.id} article={article} size="small" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Sections based on Daily Configuration */}
        {dailyConfig?.sections.map((section, index) => (
          <section key={index} className="py-8 border-b border-gray-200">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-serif font-bold mb-6">{section.title}</h2>
              <ArticleGrid 
                articles={articles.filter(article => {
                  if (section.type === 'category') return article.category === section.value;
                  if (section.type === 'tag') return article.tags.includes(section.value);
                  // Other filtering logic would go here
                  return true;
                }).slice(0, section.limit)} 
                columns={section.limit > 4 ? 3 : 2}
              />
              <div className="mt-6 text-center">
                <Link href={`/${section.type}/${section.value}`} className="inline-block border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  View All
                </Link>
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
