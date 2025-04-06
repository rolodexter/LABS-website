import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import ServiceCard from '@/components/ui/ServiceCard';
import servicesData from '@/data/services.json';
import { getAllKnowledgeModules } from '@/lib/knowledge';

type ServiceStatus = 'Stable' | 'In Development' | 'Planned';

type Service = {
  slug: string;
  title: string;
  category: string;
  status: ServiceStatus;
  path: string;
  linkedAgent?: string;
  description?: string;
};

interface ServicesPageProps {
  categories: Array<{
    name: string;
    path: string;
    moduleCount: number;
  }>;
}

const Services = ({ categories }: ServicesPageProps) => {
  // Group services by category
  const servicesByCategory = servicesData.reduce<Record<string, Service[]>>((acc, service) => {
    const { category } = service;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      ...service,
      status: service.status as ServiceStatus, // Type assertion to ensure proper status type
      description: getServiceDescription(service.slug),
      // Ensure linkedAgent is properly typed (string | undefined)
      linkedAgent: service.linkedAgent || undefined
    });
    return acc;
  }, {});
  
  // Service descriptions in first-person voice, aligned with brand identity
  function getServiceDescription(slug: string): string {
    const descriptions: Record<string, string> = {
      'metascience': 'I build reproducibility frameworks and evidence hierarchies that scaffold scientific discovery at scale.',
      'worker-design': 'I architect networked labor systems that coordinate microtasks across both human and machine intelligence.',
      'model-development': 'I design cognitive models as modular infrastructure, creating intelligence that builds itself.',
      'model-training': 'I develop specialized training regimes for models that learn to learn, optimizing for knowledge emergence.',
      'implementation': 'I integrate networked intelligence into your existing systems, from prototype to production.',
      'consulting': 'I provide strategic guidance on intelligence infrastructure that scales with your organization\'s knowledge needs.',
      'training': 'I build custom learning programs that transfer complex technical capabilities to your teams.',
      'workforce-development': 'I design intelligence-augmented workflows that amplify your team\'s capabilities without replacing human judgment.',
      'documentation': 'I create memory systems and contextual knowledge bases that evolve with your organization.',
      'privacy': 'I implement trust overlays and epistemic transparency models that secure your intelligence networks.'
    };
    
    return descriptions[slug] || 'I build custom intelligence solutions tailored to your specific knowledge manufacturing needs.';
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">Our Services</h1>
          <p className="text-xl text-gray-700 mb-8">
            I turn intelligence into infrastructure — helping you integrate networked intelligence
            into your workflows and processes.
          </p>
        </div>
        
        {/* Display services by category */}
        {Object.entries(servicesByCategory).map(([category, services]) => (
          <div key={category} className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-black border-b pb-2">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard 
                  key={service.slug}
                  title={service.title}
                  slug={service.slug}
                  category={service.category}
                  status={service.status}
                  path={service.path}
                  linkedAgent={service.linkedAgent}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Knowledge Module Categories */}
        {categories.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-black border-t pt-8">Service Knowledge Base</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  href={`/services/${category.path}`}
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
  return page;
};

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  const modules = await getAllKnowledgeModules();
  
  // Get service categories
  const serviceCategories = Array.from(
    new Set(
      modules
        .filter(module => module.frontMatter.category.startsWith('services/'))
        .map(module => module.frontMatter.category.split('/')[1])
    )
  );
  
  const categories = serviceCategories.map(category => ({
    name: category,
    path: category,
    moduleCount: modules.filter(m => m.frontMatter.category === `services/${category}`).length
  }));
  
  return {
    props: {
      categories
    },
    revalidate: 60 * 60 // Revalidate every hour
  };
};

export default Services;
