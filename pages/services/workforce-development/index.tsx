import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function WorkforceDevelopment() {
  const programs = [
    {
      name: 'Technical Training',
      description: 'Comprehensive technical skills development',
      features: [
        'AI & ML Fundamentals',
        'Programming Skills',
        'Data Science',
        'DevOps Practices'
      ]
    },
    {
      name: 'Leadership Development',
      description: 'AI leadership and management training',
      features: [
        'AI Strategy',
        'Project Management',
        'Team Leadership',
        'Risk Management'
      ]
    },
    {
      name: 'Specialized Skills',
      description: 'Domain-specific expertise development',
      features: [
        'Industry Solutions',
        'Use Case Analysis',
        'Best Practices',
        'Tools & Frameworks'
      ]
    }
  ];

  const tracks = [
    {
      title: 'Entry Level',
      duration: '3-6 months',
      focus: 'Foundation building and core skills development'
    },
    {
      title: 'Mid Level',
      duration: '6-12 months',
      focus: 'Advanced techniques and specialized knowledge'
    },
    {
      title: 'Senior Level',
      duration: '12+ months',
      focus: 'Leadership and strategic implementation'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Workforce Development</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Comprehensive AI workforce development and training programs
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {programs.map((program) => (
          <Card key={program.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{program.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>
            <ul className="space-y-2">
              {program.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Development Tracks</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div key={track.title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{track.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Duration: {track.duration}</p>
              <p className="text-gray-600 dark:text-gray-400">{track.focus}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Custom Programs</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Need a tailored development program? Let's design one for your team.
          </p>
          <Button as={Link} href="/contact">
            Contact Us
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Success Stories</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            See how our workforce development programs have transformed teams.
          </p>
          <Button as={Link} href="/case-studies" color="light">
            View Cases
          </Button>
        </div>
      </div>
    </div>
  );
}
