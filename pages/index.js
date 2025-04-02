import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NetworkBackground from '../components/home/NetworkBackground';
import FloatingKnowledgeCards from '../components/home/FloatingKnowledgeCards';
import CapabilityCard from '../components/home/CapabilityCard';
import ProductCard from '../components/home/ProductCard';
import { BeakerIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);

  const capabilities = [
    {
      title: 'Science Mining',
      description: 'Automated ingestion and analysis of scientific literature, data sets, and research findings.',
      icon: BeakerIcon,
      details: [
        'Real-time research analysis',
        'Data pattern recognition',
        'Cross-discipline insights'
      ]
    },
    {
      title: 'Knowledge Manufacturing',
      description: 'Transforming raw insights into curated, versioned knowledge modules.',
      icon: CubeIcon,
      details: [
        'Automated curation',
        'Version control',
        'Dependency tracking'
      ]
    }
  ];

  const products = [
    {
      title: 'rolodexterIDE',
      description: 'A custom IDE with rolodexter intelligence systems baked in natively.',
      details: 'Advanced code suggestions, integrated AI debugging, and real-time knowledge integration.',
      codeSnippet: `// Example of rolodexterIDE in action
const analysis = await ai.analyze(code);
if (analysis.hasVulnerability) {
  ide.suggest(analysis.fixes);
}`
    },
    {
      title: 'LinuxAI',
      description: 'A custom Linux distribution with rolodexter AI at the OS level.',
      details: 'System-wide intelligence, automated task execution, and deep learning integration.',
      backgroundEffect: (
        <div className="animate-matrix">
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">
            {`$ sudo ai optimize system
[AI] Analyzing system performance...
[AI] Optimizing memory allocation...
[AI] Adjusting process priorities...
[AI] System optimization complete.`}
          </pre>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <NetworkBackground>
          <motion.div style={{ y: backgroundY }} className="absolute inset-0" />
        </NetworkBackground>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              What is rolodexter?
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Self-building, networked intelligence systems.
            </p>
          </motion.div>

          <FloatingKnowledgeCards />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Core Capabilities: Driving rolodexter's Intelligence
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={capability.title}
                {...capability}
                animationDelay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-black/50 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Explore Our Products
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ProductCard
                key={product.title}
                {...product}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
