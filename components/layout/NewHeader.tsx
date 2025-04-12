import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NewHeader: React.FC = () => {
  return (
    <header className="border-b border-lab-black py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Brand */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-2xl font-bold tracking-tight"
              >
                rolodexterLA BS
              </motion.div>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link href="/articles" className="nav-link">
              Articles
            </Link>
            <Link href="/knowledge" className="nav-link">
              Knowledge
            </Link>
            <Link href="/ecosystem" className="nav-link">
              Ecosystem
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
