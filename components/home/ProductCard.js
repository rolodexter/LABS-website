import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProductCard({
  title,
  description,
  details,
  codeSnippet,
  image,
  backgroundEffect
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-white border border-black hover:border-gray-900"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Effect */}
      <AnimatePresence>
        {isHovered && backgroundEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {backgroundEffect}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Content Side */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="text-sm text-gray-500"
                >
                  {details}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {image ? (
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : codeSnippet ? (
              <div className="bg-black rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
                <pre>{codeSnippet}</pre>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
