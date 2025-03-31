import { Card  } from '@/components/ui';

export default function Research() {
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
      <div className="space-y-6">
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
