import React from 'react';
import Link from 'next/link';

const NewFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-lab-black py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h3 className="font-mono text-lg font-bold mb-4">rolodexterLA BS</h3>
            <p className="font-serif text-sm text-lab-gray-600 mb-4">
              A minimalist knowledge platform for high-volume content publishing.
            </p>
          </div>
          
          {/* Navigation Columns */}
          <div className="col-span-1">
            <h4 className="font-mono text-sm font-bold uppercase mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/articles" className="text-sm hover:underline">Articles</Link></li>
              <li><Link href="/knowledge" className="text-sm hover:underline">Knowledge</Link></li>
              <li><Link href="/ecosystem" className="text-sm hover:underline">Ecosystem</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-mono text-sm font-bold uppercase mb-4">Ecosystem</h4>
            <ul className="space-y-2">
              <li><Link href="/ecosystem/gpt" className="text-sm hover:underline">rolodexterGPT</Link></li>
              <li><Link href="/ecosystem/vs" className="text-sm hover:underline">rolodexterVS</Link></li>
              <li><Link href="/ecosystem/git" className="text-sm hover:underline">rolodexterGIT</Link></li>
              <li><Link href="/ecosystem/api" className="text-sm hover:underline">rolodexterAPI</Link></li>
              <li><Link href="/ecosystem/int" className="text-sm hover:underline">rolodexterINT</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-mono text-sm font-bold uppercase mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:underline">About</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm hover:underline">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-lab-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-lab-gray-500 mb-4 md:mb-0">
            © {currentYear} rolodexterLA BS. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-lab-gray-500 hover:text-lab-black">Twitter</a>
            <a href="#" className="text-xs text-lab-gray-500 hover:text-lab-black">LinkedIn</a>
            <a href="#" className="text-xs text-lab-gray-500 hover:text-lab-black">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
