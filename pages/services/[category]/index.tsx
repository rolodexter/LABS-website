import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { getKnowledgeModulesByCategory, getAllKnowledgeModules } from '@/lib/knowledge';

interface CategoryPageProps {
  category: string;
  modules: Array<{
    title: string;
    slug: string;
    summary: string;
    last_updated: string;
    agent_author: string[];
  }>;
}

interface Params extends ParsedUrlQuery {
  category: string;
}

export default function ServiceCategoryPage({ category, modules }: CategoryPageProps) {
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <>
      <Head>
        <title>{formattedCategory} Services | rolodexterLABS</title>
        <meta name="description" content={`rolodexterLABS ${category} services`} />
      </Head>
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{formattedCategory} Services</h1>
          <p className="text-xl text-gray-600">
            rolodexterLABS professional services and capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link 
              href={`/services/${category}/${module.slug}`} 
              key={module.slug}
              className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{module.summary}</p>
              
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-500">
                  {module.last_updated && format(new Date(module.last_updated), 'MMM d, yyyy')}
                </div>
                
                {module.agent_author && module.agent_author.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">by</span>
                    <span className="font-medium">{module.agent_author[0]}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<CategoryPageProps, Params> = async ({ params }) => {
  if (!params?.category) {
    return { notFound: true };
  }
  
  const category = params.category;
  const categoryPath = `services/${category}`;
  
  const knowledgeModules = await getKnowledgeModulesByCategory(categoryPath);
  
  if (!knowledgeModules.length) {
    return { notFound: true };
  }
  
  const modules = knowledgeModules.map(module => ({
    title: module.frontMatter.title,
    slug: module.frontMatter.slug,
    summary: module.frontMatter.summary,
    last_updated: module.frontMatter.last_updated,
    agent_author: module.frontMatter.agent_author
  }));
  
  return {
    props: {
      category,
      modules
    },
    revalidate: 60 * 60 // Revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const modules = await getAllKnowledgeModules();
  
  // Extract unique categories
  const categories = Array.from(
    new Set(
      modules
        .map(module => module.frontMatter.category)
        .filter(category => category.startsWith('services/'))
        .map(category => category.split('/')[1])
    )
  );
  
  const paths = categories.map(category => ({
    params: { category }
  }));
  
  return {
    paths,
    fallback: 'blocking'
  };
};
