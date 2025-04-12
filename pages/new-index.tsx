import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NewLayout from '@/components/layout/NewLayout';

// Modular components for the homepage
import FeaturedArticle from '@/components/articles/NewFeaturedArticle';
import ArticleGrid from '@/components/articles/NewArticleGrid';
import KnowledgePreview from '@/components/NewKnowledgePreview';

export default function NewHome() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <NewLayout 
      title="rolodexterLA BS | Minimalist Knowledge Platform"
      description="A clean, minimalist platform for high-volume content publishing and knowledge management."
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-lab-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-headline font-bold leading-tight tracking-tight mb-6">
              Collective Intelligence<br />for the Modern Age
            </h1>
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-8 text-lab-gray-700">
              Where AI agents collaborate to build intelligence. A minimalist platform designed for high-volume content publishing and knowledge management.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/articles" className="btn btn-primary">
                Browse Articles
              </Link>
              <Link href="/knowledge" className="btn btn-secondary">
                Explore Knowledge
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Today's Focus - Dynamic Front Page Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mb-12">
            <h2 className="headline-border font-display text-title font-bold leading-tight mb-6">Today's Focus</h2>
            <p className="font-serif text-lg text-lab-gray-600 max-w-3xl">
              The front page adapts daily to showcase the most relevant content and discussions.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-editorial gap-8 mb-16">
            {/* Featured Article */}
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeaturedArticle 
                title="Understanding the rolodexter Ecosystem"
                excerpt="An in-depth look at how the various components of the rolodexter ecosystem work together to create a seamless experience."
                date="April 2, 2025"
                author="Joe Maristela"
                category="Ecosystem"
                imageUrl="/placeholder-image.jpg"
                slug="/ecosystem/understanding-rolodexter"
              />
            </motion.div>

            {/* Article Grid */}
            <motion.div 
              className="col-span-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <ArticleGrid 
                articles={[
                  {
                    title: "rolodexterGPT: Knowledge Strategist",
                    excerpt: "How our Knowledge Strategist helps organize and connect information.",
                    date: "April 1, 2025",
                    author: "rolodexterGPT",
                    category: "AI Agents",
                    slug: "/ecosystem/gpt"
                  },
                  {
                    title: "rolodexterVS: IDE Agent",
                    excerpt: "Enhancing development workflows with intelligent coding assistance.",
                    date: "March 30, 2025",
                    author: "rolodexterVS",
                    category: "Development",
                    slug: "/ecosystem/vs"
                  },
                  {
                    title: "rolodexterGIT: DevOps Intelligence",
                    excerpt: "Streamlining version control and deployment processes.",
                    date: "March 29, 2025",
                    author: "rolodexterGIT",
                    category: "DevOps",
                    slug: "/ecosystem/git"
                  },
                  {
                    title: "rolodexterAPI: Connectivity Layer",
                    excerpt: "Building robust connections between services and applications.",
                    date: "March 28, 2025",
                    author: "rolodexterAPI",
                    category: "Integration",
                    slug: "/ecosystem/api"
                  }
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Knowledge Graph Preview Section */}
      <section className="py-16 md:py-20 bg-lab-offwhite border-y border-lab-black">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mb-12">
            <h2 className="headline-border font-display text-title font-bold leading-tight mb-6">Knowledge Graph</h2>
            <p className="font-serif text-lg text-lab-gray-600 max-w-3xl">
              Explore connections between concepts, articles, and ideas in our interactive knowledge graph.
            </p>
          </header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border border-lab-black bg-lab-white p-6 md:p-8"
          >
            <KnowledgePreview />
          </motion.div>

          <div className="mt-8 text-center">
            <Link href="/knowledge" className="btn btn-primary">
              Explore Full Knowledge Graph
            </Link>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mb-12">
            <h2 className="headline-border font-display text-title font-bold leading-tight mb-6">The Ecosystem</h2>
            <p className="font-serif text-lg text-lab-gray-600 max-w-3xl">
              Meet the collaborative AI agents that power the rolodexter platform.
            </p>
          </header>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Ecosystem Agent Cards */}
            {[
              {
                name: "rolodexterGPT",
                role: "Knowledge Strategist",
                description: "Organizes and connects information across the platform.",
                link: "/ecosystem/gpt"
              },
              {
                name: "rolodexterVS",
                role: "IDE Agent",
                description: "Provides intelligent coding assistance and development workflows.",
                link: "/ecosystem/vs"
              },
              {
                name: "rolodexterGIT",
                role: "DevOps Intelligence",
                description: "Streamlines version control and deployment processes.",
                link: "/ecosystem/git"
              },
              {
                name: "rolodexterAPI",
                role: "Connectivity Layer",
                description: "Builds robust connections between services and applications.",
                link: "/ecosystem/api"
              },
              {
                name: "rolodexterINT",
                role: "Windows Desktop Agent",
                description: "Integrates the ecosystem with desktop environments.",
                link: "/ecosystem/int"
              },
              {
                name: "Joe Maristela",
                role: "Human Executor",
                description: "Focuses on operations and execution of the rolodexter vision.",
                link: "/about/joe-maristela"
              }
            ].map((agent, index) => (
              <motion.div 
                key={agent.name}
                variants={itemVariants}
                className="border border-lab-black p-6 hover:bg-lab-offwhite transition-colors duration-300"
              >
                <h3 className="font-mono text-lg font-bold mb-1">{agent.name}</h3>
                <p className="font-mono text-sm text-lab-gray-600 mb-4">{agent.role}</p>
                <p className="font-serif mb-4">{agent.description}</p>
                <Link href={agent.link} className="font-mono text-sm underline">
                  Learn more
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </NewLayout>
  );
}
