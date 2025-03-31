import { Card } from 'flowbite-react';

export default function Companies() {
  const companies = [
    {
      name: 'AI Solutions Co.',
      description: 'Enterprise AI solutions and consulting',
      status: 'Active',
      year: '2023'
    },
    {
      name: 'DataFlow Systems',
      description: 'Data processing and analytics platform',
      status: 'Active',
      year: '2024'
    },
    {
      name: 'ML Research Labs',
      description: 'Advanced machine learning research',
      status: 'In Development',
      year: '2025'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Our Companies</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <Card key={company.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{company.name}</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">{company.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Founded: {company.year}</p>
              </div>
              <div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  company.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {company.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
