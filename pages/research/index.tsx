import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { getAllKnowledgeModules } from '@/lib/knowledge';

interface ResearchPageProps {
  categories: Array<{
    name: string;
    path: string;
    moduleCount: number;
  }>;
  featuredModules: Array<{
    title: string;
    slug: string;
    summary: string;
    category: string;
    last_updated: string;
  }>;
}

export default function Research({ categories, featuredModules }: ResearchPageProps) {
  // Legacy papers data
  const papers = [
    {
      title: 'Advancing AI Ethics',
      abstract: 'Research into ethical AI development and implementation',
      date: '2025',
      category: 'Ethics'
    },
    {
      title: 'Neural Network Optimization',
      abstract: 'Novel approaches to training large language models',
      date: '2024',
      category: 'Machine Learning'
    },
    {
      title: 'Data Privacy in AI',
      abstract: 'Techniques for preserving privacy in AI systems',
      date: '2024',
      category: 'Privacy'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Research</h1>
      
      {/* Knowledge Categories */}
      {categories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Knowledge Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={`/research/${category.path}`}
                className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white capitalize">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {category.moduleCount} knowledge module{category.moduleCount !== 1 ? 's' : ''}
                </p>
                <span className="text-sm font-medium">
                  Browse modules →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Featured Knowledge Modules */}
      {featuredModules.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Featured Knowledge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredModules.map((module) => (
              <Link 
                key={module.slug} 
                href={`/${module.category}/${module.slug}`}
                className="block"
              >
                <Card className="h-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{module.title}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">{module.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {new Date(module.last_updated).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-medium">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Legacy Research Papers */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Research Papers</h2>
        {papers.map((paper) => (
          <Card key={paper.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{paper.title}</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">{paper.abstract}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500 dark:text-gray-400">{paper.date}</span>
                <div className="mt-2">
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {paper.category}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ResearchPageProps> = async () => {
  const modules = await getAllKnowledgeModules();
  
  // Get research categories
  const researchCategories = Array.from(
    new Set(
      modules
        .filter(module => module.frontMatter.category.startsWith('research/'))
        .map(module => module.frontMatter.category.split('/')[1])
    )
  );
  
  const categories = researchCategories.map(category => ({
    name: category,
    path: category,
    moduleCount: modules.filter(m => m.frontMatter.category === `research/${category}`).length
  }));
  
  // Get featured modules (most recent from each category)
  const featuredModules = researchCategories
    .map(category => {
      const categoryModules = modules
        .filter(m => m.frontMatter.category === `research/${category}`)
        .sort((a, b) => 
          new Date(b.frontMatter.last_updated).getTime() - 
          new Date(a.frontMatter.last_updated).getTime()
        );
      
      return categoryModules[0];
    })
    .filter(Boolean)
    .map(module => ({
      title: module.frontMatter.title,
      slug: module.frontMatter.slug,
      summary: module.frontMatter.summary,
      category: module.frontMatter.category,
      last_updated: module.frontMatter.last_updated
    }));
  
  return {
    props: {
      categories,
      featuredModules
    },
    revalidate: 60 * 60 // Revalidate every hour
  };
};
