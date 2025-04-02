import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FloatingKnowledgeCards() {
  const [modules, setModules] = useState([]);
  const [visibleModules, setVisibleModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all knowledge modules
  useEffect(() => {
    fetch('/api/knowledge')
      .then(res => res.json())
      .then(data => {
        setModules(data.filter(m => m.status === 'active'));
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching modules:', err);
        setIsLoading(false);
      });
  }, []);

  // Rotate visible modules every 5 seconds
  useEffect(() => {
    if (modules.length === 0) return;

    // Initialize with 5 random modules
    const getRandomModules = () => {
      const shuffled = [...modules].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };

    setVisibleModules(getRandomModules());

    const interval = setInterval(() => {
      setVisibleModules(getRandomModules());
    }, 5000);

    return () => clearInterval(interval);
  }, [modules]);

  if (isLoading || visibleModules.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-96">
      <AnimatePresence>
        {visibleModules.map((module, index) => (
          <motion.div
            key={module.slug}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: `${-20 + (index * 10)}%`,
              y: `${-10 + (index * 5)}%`,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute"
            whileHover={{ scale: 1.1, zIndex: 10 }}
          >
            <Link
              href={module.slug}
              className="block bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:bg-opacity-20 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {module.title}
              </h3>
              <div className="text-sm text-gray-300">
                {module.category}
                {module.subcategory && ` / ${module.subcategory}`}
              </div>
              {module.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {module.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-white bg-opacity-10 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
