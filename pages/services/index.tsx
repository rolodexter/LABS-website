import { GetStaticProps } from 'next';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';
import { getAllKnowledgeModules } from '@/lib/knowledge';

interface ServicesPageProps {
  categories: Array<{
    name: string;
    path: string;
    moduleCount: number;
  }>;
}

export default function Services({ categories }: ServicesPageProps) {
  // Core service offerings
  const services = [
    {
      title: 'Intelligence',
      description: 'Manufacturing knowledge at scale through frontier AI systems',
      href: '/services/intelligence',
      icon: '🧠'
    },
    {
      title: 'Consulting',
      description: 'Strategic AI implementation advice',
      href: '/services/consulting',
      icon: '💡'
    },
    {
      title: 'Implementation',
      description: 'Full-service rollout and integration',
      href: '/services/implementation',
      icon: '⚙️'
    },
    {
      title: 'Training',
      description: 'Team development and upskilling programs',
      href: '/services/training',
      icon: '📚'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Our Services</h1>
      
      {/* Core Services */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {services.map((service) => (
          <Card key={service.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{service.title}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{service.description}</p>
            <Button as={Link} href={service.href} className="w-full">
              Learn More
            </Button>
          </Card>
        ))}
      </div>
      
      {/* Knowledge Module Categories */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Service Knowledge Base</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={`/services/${category.path}`}
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
    </div>
  );
}

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
