import Link from 'next/link';

export default function About() {
  const milestones = [
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
      title: 'Global Expansion',
      description: 'Expanded operations globally and launched rolodexterLARP division.'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of AI technology and research.'
    },
    {
      title: 'Excellence',
      description: 'Commitment to delivering high-quality solutions.'
    },
    {
      title: 'Collaboration',
      description: 'Working together with partners and communities.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-16">About rolodexterLABS</h1>
      
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-gray-600">
            At rolodexterLABS, we're dedicated to advancing AI technology through innovative research,
            development, and practical applications. Our mission is to make AI accessible,
            ethical, and beneficial for everyone.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </Link>
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
        <h2 className="text-2xl font-bold mb-12">Our Journey</h2>
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-8">
              <div className="flex-none w-24 font-bold">{milestone.date}</div>
              <div>
                <h3 className="font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
