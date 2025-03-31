import Link from 'next/link';
import { Button } from '@/components/ui';

export default function About() {
  const milestones = [
    {
      date: '2010s',
      title: 'Origins',
      description: 'Joe Maristela first utilized rolodexter as a common interface between himself and staff at the ParkHealth Foundation, laying the groundwork for what would become rolodexterLABS.'
    },
    {
      date: '2023',
      title: 'Foundation',
      description: 'rolodexterLABS was established with a vision to revolutionize AI development.'
    },
    {
      date: '2024',
      title: 'Product Launch',
      description: 'Released our first suite of AI products and development tools.'
    },
    {
      date: '2025',
      title: 'Community & Expansion',
      description: 'Expanded operations globally and launched the rolodexterLARP division. Introduced the pump.fun token to gauge community interest in our technology platform and approach to AI.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-gray-600">
            At rolodexterLABS, we're dedicated to advancing AI technology through innovative research,
            development, and practical applications. Our mission is to make AI accessible,
            ethical, and beneficial for everyone.
          </p>
          <Button href="/contact" variant="primary">
            Get in Touch
          </Button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="text-gray-600">
            We envision a future where AI serves as a foundational tool for accelerating scientific discovery,
            manufacturing knowledge at scale, and enabling transformative executive intelligence capabilities.
          </p>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8">Our Journey</h2>
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-8">
              <div className="w-24 flex-shrink-0">
                <span className="text-xl font-bold">{milestone.date}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Impact</h3>
            <p className="text-gray-600">We strive to create meaningful change through our technology, focusing on solutions that drive real-world progress and societal advancement.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Efficiency</h3>
            <p className="text-gray-600">Our commitment to optimizing processes and systems ensures we deliver maximum value while minimizing resource consumption.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Science</h3>
            <p className="text-gray-600">We ground our work in scientific principles, embracing rigorous research and empirical evidence to guide our technological innovations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
