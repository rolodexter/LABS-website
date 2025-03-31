import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Companies() {
  const companies = [
    {
      name: 'rolodexterLABS',
      description: 'AI Research and Development',
      status: 'Active',
      year: '2023',
      href: '/companies/rolodexter-labs'
    },
    {
      name: 'rolodexterLARP',
      description: 'Live Action Role-Playing Solutions',
      status: 'Active',
      year: '2024',
      href: '/companies/rolodexter-larp'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Our Companies</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {companies.map((company) => (
          <Card key={company.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{company.name}</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">{company.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Founded: {company.year}</p>
              </div>
              <div>
                <span className="px-3 py-1 text-sm rounded-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white">
                  {company.status}
                </span>
              </div>
            </div>
            <Link href={company.href}>
              <Button
                className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Learn More
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Strategic Partners</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Discover our network of strategic technology partners and collaborators.
        </p>
        <Link href="/companies/partners">
          <Button
            className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            View Partners
          </Button>
        </Link>
      </div>
    </div>
  );
}
