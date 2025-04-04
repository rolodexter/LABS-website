import { useEffect, useState } from 'react';
import { MagazineLayout } from '@/components/layout/PageLayouts';
import DailyFocus from '@/components/home/DailyFocus';
import ArticleGrid from '@/components/articles/ArticleGrid';
import FeaturedArticle from '@/components/articles/FeaturedArticle';
import KnowledgeGraph from '@/components/knowledge/KnowledgeGraph';

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

interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  slug: string;
  tags: string[];
  connections: string[];
  strength?: number;
}

export default function Home() {
  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [graphNodes, setGraphNodes] = useState<KnowledgeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyFocus, setDailyFocus] = useState({
    title: 'AI Governance & Ethics',
    description: 'Exploring the frameworks needed for responsible AI development',
    date: '2025-04-02'
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // This would be API calls in production
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
            image: '/images/placeholder.jpg'
          },
          {
            id: 'article-002',
            title: 'Implementing Ethical AI Frameworks',
            slug: 'ethical-ai-frameworks',
            excerpt: 'A comprehensive guide to implementing ethical considerations in AI development pipelines.',
            publishDate: '2025-04-01',
            lastUpdated: '2025-04-02',
            readTime: '12 min',
            category: 'documentation',
            subcategory: 'ethics',
            tags: ['ethics', 'governance', 'best-practices'],
            featured: true,
            priority: 2,
            image: '/images/placeholder.jpg'
          },
          {
            id: 'article-003',
            title: 'rolodexterVS: IDE of the Future',
            slug: 'rolodextervs-ide-future',
            excerpt: 'Exploring how rolodexterVS is transforming software development through intelligent assistance.',
            publishDate: '2025-03-30',
            lastUpdated: '2025-04-01',
            readTime: '6 min',
            category: 'products',
            subcategory: 'rolodextervs',
            tags: ['IDE', 'development', 'productivity'],
            featured: true,
            priority: 3,
            image: '/images/placeholder.jpg'
          },
          {
            id: 'article-004',
            title: 'Knowledge Graphs for Enterprise',
            slug: 'knowledge-graphs-enterprise',
            excerpt: 'How large organizations are leveraging knowledge graph technology to connect information silos.',
            publishDate: '2025-03-29',
            lastUpdated: '2025-03-29',
            readTime: '10 min',
            category: 'research',
            subcategory: 'knowledge-graphs',
            tags: ['enterprise', 'knowledge-management'],
            featured: false,
            image: '/images/placeholder.jpg'
          },
          {
            id: 'article-005',
            title: 'Collaborative Governance in Practice',
            slug: 'collaborative-governance-practice',
            excerpt: 'Real-world examples of how the rolodexter ecosystem implements collaborative governance.',
            publishDate: '2025-03-28',
            lastUpdated: '2025-03-28',
            readTime: '9 min',
            category: 'documentation',
            subcategory: 'governance',
            tags: ['governance', 'collaboration'],
            featured: false,
            image: '/images/placeholder.jpg'
          },
          {
            id: 'article-006',
            title: 'rolodexterAPI Integration Guide',
            slug: 'rolodexterapi-integration',
            excerpt: 'A technical guide to integrating with the rolodexterAPI connectivity layer.',
            publishDate: '2025-03-27',
            lastUpdated: '2025-03-30',
            readTime: '15 min',
            category: 'documentation',
            subcategory: 'api',
            tags: ['api', 'integration', 'development'],
            featured: false,
            image: '/images/placeholder.jpg'
          }
        ];

        // Mock knowledge graph data
        const mockNodes: KnowledgeNode[] = [
          {
            id: 'node-001',
            title: 'rolodexterGPT',
            category: 'product',
            slug: '/products/rolodextergpt',
            tags: ['AI', 'knowledge-management'],
            connections: ['node-002', 'node-003', 'node-004'],
            strength: 10
          },
          {
            id: 'node-002',
            title: 'rolodexterVS',
            category: 'product',
            slug: '/products/rolodextervs',
            tags: ['IDE', 'development'],
            connections: ['node-001', 'node-003'],
            strength: 8
          },
          {
            id: 'node-003',
            title: 'rolodexterGIT',
            category: 'product',
            slug: '/products/rolodextergit',
            tags: ['version-control', 'devops'],
            connections: ['node-001', 'node-002', 'node-005'],
            strength: 7
          },
          {
            id: 'node-004',
            title: 'AI Governance',
            category: 'research',
            slug: '/research/ai-governance',
            tags: ['ethics', 'governance'],
            connections: ['node-001', 'node-006'],
            strength: 9
          },
          {
            id: 'node-005',
            title: 'DevOps Intelligence',
            category: 'research',
            slug: '/research/devops-intelligence',
            tags: ['devops', 'automation'],
            connections: ['node-003'],
            strength: 6
          },
          {
            id: 'node-006',
            title: 'Collaborative Governance',
            category: 'documentation',
            slug: '/documentation/collaborative-governance',
            tags: ['governance', 'collaboration'],
            connections: ['node-004'],
            strength: 5
          }
        ];

        setArticles(mockArticles);
        setFeaturedArticles(mockArticles.filter(article => article.featured));
        setGraphNodes(mockNodes);
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

  // Components for the magazine layout
  const dailyFocusHeader = (
    <DailyFocus
      title={dailyFocus.title}
      description={dailyFocus.description}
      date={dailyFocus.date}
    />
  );

  const featuredContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {featuredArticles.length > 0 && (
        <>
          <FeaturedArticle article={featuredArticles[0]} size="large" />
          <div className="grid grid-cols-1 gap-6">
            {featuredArticles.slice(1, 3).map((article) => (
              <FeaturedArticle key={article.id} article={article} size="small" />
            ))}
          </div>
        </>
      )}
    </div>
  );

  const primarySection = (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-6">Latest Research</h2>
      <ArticleGrid
        articles={articles.filter(article => article.category === 'research')}
        columns={2}
      />
    </div>
  );

  const secondarySections = [
    <div key="trending">
      <h2 className="text-xl font-serif font-bold mb-4">Trending Topics</h2>
      <ul className="space-y-4">
        {['AI Governance', 'Knowledge Graphs', 'Collaborative Intelligence', 'DevOps Automation'].map((topic) => (
          <li key={topic} className="border-b border-gray-100 pb-2">
            <a href="#" className="text-black hover:underline">{topic}</a>
          </li>
        ))}
      </ul>
    </div>,
    <div key="knowledge-graph">
      <h2 className="text-xl font-serif font-bold mb-4">Knowledge Network</h2>
      <div className="border border-gray-200 p-2 h-80">
        <KnowledgeGraph
          nodes={graphNodes}
          height={300}
          width={300}
          showLabels={false}
          theme="light"
        />
      </div>
      <div className="mt-2 text-center">
        <a href="/knowledge/graph" className="text-sm text-gray-600 hover:text-black hover:underline">
          Explore Full Knowledge Graph
        </a>
      </div>
    </div>
  ];

  const fullWidthSections = [
    <div key="documentation">
      <h2 className="text-2xl font-serif font-bold mb-6">Documentation & Guides</h2>
      <ArticleGrid
        articles={articles.filter(article => article.category === 'documentation')}
        columns={3}
      />
    </div>,
    <div key="products">
      <h2 className="text-2xl font-serif font-bold mb-6">Product Updates</h2>
      <ArticleGrid
        articles={articles.filter(article => article.category === 'products')}
        columns={3}
        showExcerpt={false}
      />
    </div>
  ];

  return (
    <MagazineLayout
      title="rolodexterLABS | Knowledge Hub"
      description="The latest research, insights, and updates from rolodexterLABS"
      header={dailyFocusHeader}
      featuredContent={featuredContent}
      primarySection={primarySection}
      secondarySections={secondarySections}
      fullWidthSections={fullWidthSections}
    >
      {/* Additional content could go here if needed */}
    </MagazineLayout>
  );
}
