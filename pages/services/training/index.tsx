import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Training() {
  const programs = [
    {
      title: 'AI Fundamentals',
      description: 'Core concepts and principles of AI',
      icon: '📚'
    },
    {
      title: 'Technical Training',
      description: 'Hands-on system implementation training',
      icon: '💻'
    },
    {
      title: 'Leadership Workshop',
      description: 'AI strategy and management for leaders',
      icon: '👥'
    }
  ];

  const benefits = [
    {
      title: 'Customized Learning',
      description: 'Programs tailored to your team\'s needs and skill level'
    },
    {
      title: 'Practical Experience',
      description: 'Real-world projects and hands-on exercises'
    },
    {
      title: 'Ongoing Support',
      description: 'Continuous guidance and resources post-training'
    },
    {
      title: 'Certification',
      description: 'Industry-recognized certifications upon completion'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Training Programs</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Comprehensive AI training and development programs
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {programs.map((program) => (
          <Card key={program.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{program.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{program.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{program.description}</p>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Program Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">For Teams</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Custom training programs for organizations looking to upskill their teams.
          </p>
          <Link href="/contact">
            <Button>
              Request Team Training
            </Button>
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">For Individuals</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Join our upcoming public training sessions and workshops.
          </p>
          <Link href="/training/schedule">
            <Button color="light">
              View Schedule
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
