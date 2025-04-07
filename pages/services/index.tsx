import React, { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import ServiceCard from '@/components/ui/ServiceCard';
import servicesData from '@/data/services.json';
import type { NextPageWithLayout } from '@/types/next';
import { getAllKnowledgeModules } from '@/lib/knowledge';
import { getServiceContent, getAllServicesByCategory, getServiceDescription } from '@/lib/services';

type ServiceStatus = 'available' | 'development' | 'planned';

type Service = {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  status: ServiceStatus;
  path: string;
  linkedAgent?: string;
  description?: string;
  icon?: string;
  priority?: number;
  contentPath?: string | null;
  source?: string | null;
  badge?: string | null;
};

interface ServicesPageProps {
  categories: Array<{
    name: string;
    path: string;
    moduleCount: number;
  }>;
  markdownContent: Record<string, any>;
}

const Services: NextPageWithLayout<ServicesPageProps> = ({ categories, markdownContent }): React.ReactNode => {
  // Group services by category and enhance with markdown content when available
  const servicesByCategory = servicesData.reduce<Record<string, Service[]>>((acc, service) => {
    const { category } = service;
    if (!acc[category]) {
      acc[category] = [];
    }
    
    // Check if we have markdown content for this service
    const mdContent = markdownContent[service.slug];
    
    acc[category].push({
      ...service,
      status: service.status as ServiceStatus, // Type assertion to ensure proper status type
      description: mdContent ? getServiceDescription(mdContent) : getServiceDescription({ id: service.id, slug: service.slug }),
      // Ensure linkedAgent is properly typed (string | undefined)
      linkedAgent: mdContent?.linkedAgent || service.linkedAgent || undefined
    });
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 antialiased">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">Services</h1>
          <p className="text-xl text-gray-700 mb-4">
            I transform intelligence into infrastructure — integrating knowledge manufacturing
            directly into your operational processes.
          </p>
          <div className="w-16 h-1 bg-gray-200 mx-auto mt-8"></div>
        </div>
        
        {/* Display services by category */}
        {Object.entries(servicesByCategory)
          .filter(([category]) => ['Blockchains', 'Models', 'Science', 'Work'].includes(category))
          .sort((a, b) => {
            // Get the first service from each category to check priority
            const priorityA = a[1][0]?.priority || 999;
            const priorityB = b[1][0]?.priority || 999;
            return priorityA - priorityB;
          })
          .map(([category, services]) => {
            // Count available vs development services
            const availableCount = services.filter(s => s.status === 'available').length;
            const developmentCount = services.filter(s => s.status === 'development').length;
            
            return (
              <div key={category} className="max-w-6xl mx-auto mb-24" id={category.toLowerCase()}>
                <h2 className="text-2xl font-bold mb-8 text-black flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">{services[0]?.icon || ''}</span> {category}
                  </span>
                  {developmentCount > 0 && (
                    <span className="text-sm font-normal text-gray-500 border-l pl-4 ml-4">
                      {availableCount} available · {developmentCount} in development
                    </span>
                  )}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 mb-8 relative">
                  {services
                    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
                    .map((service) => (
                      <ServiceCard 
                        key={service.slug}
                        title={service.title}
                        slug={service.slug}
                        category={service.category}
                        status={service.status}
                        path={service.path}
                        linkedAgent={service.linkedAgent}
                        description={service.description}
                        badge={service.badge}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        
        {/* Knowledge Module Categories */}
        {categories.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-black border-t pt-12 mt-12">Knowledge Modules</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  href={`/knowledge/${category.path}`}
                  className="block p-6 border border-gray-200 rounded-lg hover:border-black transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-2 text-black capitalize">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
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
      </div>
    </div>
  );
};

// Add custom layout function for the services page to prevent duplicate footer
Services.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header></header> {/* Empty header placeholder - actual header will be rendered by _app.tsx */}
      <main className="flex-grow">{page}</main>
      {/* No footer here - this prevents the duplicate footer */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const knowledgeModules = await getAllKnowledgeModules();
  
  // Group knowledge modules by category
  const categoriesMap = knowledgeModules.reduce<Record<string, number>>((acc, module) => {
    const { category } = module.frontMatter;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  // Format categories for display
  const categories = Object.entries(categoriesMap)
    .filter(([name]) => name && !name.startsWith('_')) // Filter out any special categories
    .map(([name, count]) => {
      return {
        name,
        path: name.toLowerCase().replace(/ /g, '-'),
        moduleCount: count
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  
  // Get markdown content for all available services
  const markdownContent: Record<string, any> = {};
  for (const service of servicesData) {
    if (service.source) {
      const content = await getServiceContent(service.slug);
      if (content) {
        markdownContent[service.slug] = content;
      }
    }
  }
  
  return {
    props: {
      categories,
      markdownContent
    },
    revalidate: 60 * 60 // Revalidate every hour
  };
};

export default Services;
