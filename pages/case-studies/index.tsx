import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function CaseStudies() {
  const caseStudies = [
    {
      title: 'AI Transformation at Global Bank',
      industry: 'Finance',
      results: ['50% reduction in processing time', '30% cost savings', 'Improved accuracy by 95%'],
      solution: 'Custom AI solution for fraud detection'
    },
    {
      title: 'Healthcare Analytics Platform',
      industry: 'Healthcare',
      results: ['Real-time patient monitoring', 'Predictive diagnosis accuracy of 92%', 'Reduced wait times by 40%'],
      solution: 'Advanced analytics and ML models'
    },
    {
      title: 'Manufacturing Process Optimization',
      industry: 'Manufacturing',
      results: ['25% increase in production efficiency', '60% defect reduction', 'Energy savings of 35%'],
      solution: 'AI-powered process automation'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Case Studies</h1>
      
      <div className="space-y-8">
        {caseStudies.map((study) => (
          <Card key={study.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{study.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Industry: {study.industry}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{study.solution}</p>
                <Button as={Link} href={`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  Read Full Case Study
                </Button>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Key Results</h3>
                <ul className="space-y-2">
                  {study.results.map((result) => (
                    <li key={result} className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="mr-2">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
