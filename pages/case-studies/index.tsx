import { Button, Card } from '@/components/ui';
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
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-12">Case Studies</h1>
      
      <div className="space-y-8">
        {caseStudies.map((study) => (
          <Card key={study.title} variant="hover" padding="lg">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{study.title}</h2>
                  <p className="text-gray-600">Industry: {study.industry}</p>
                </div>
                <p className="text-gray-600">{study.solution}</p>
                <Button 
                  href={`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                  variant="outline"
                >
                  Read Full Case Study
                </Button>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Key Results</h3>
                <ul className="space-y-4">
                  {study.results.map((result) => (
                    <li key={result} className="flex items-center text-gray-600">
                      <span className="mr-3 text-black">✓</span>
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
