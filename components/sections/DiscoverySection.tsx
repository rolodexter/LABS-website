import { MagnifyingGlassIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Discovery Mining',
    description: 'AI-powered exploration techniques to rapidly mine insights from massive datasets, driving novel scientific breakthroughs.',
    Icon: MagnifyingGlassIcon,
  },
  {
    title: 'Knowledge Manufacturing',
    description: 'Transforming raw data into structured, actionable knowledge with automated intelligence workflows.',
    Icon: LightBulbIcon,
  },
  {
    title: 'Scientific Acceleration',
    description: 'Accelerate research and experimentation with intelligent automation, reducing time-to-discovery.',
    Icon: RocketLaunchIcon,
  },
];

export default function DiscoverySection() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Accelerating Scientific Breakthroughs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Harness AI-driven knowledge mining to manufacture discoveries at scale, unlocking unprecedented scientific potential.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg">
              <feature.Icon className="w-12 h-12 mb-4 text-black dark:text-white" />
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
