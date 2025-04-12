import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-lab-white border-t border-lab-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-xl font-bold mb-6 headline-border">rolodexterLABS</h3>
            <p className="font-serif mb-6">
              Advanced knowledge management and intelligence tools for professionals.
            </p>
            <div className="flex space-x-6">
              <a href="https://twitter.com/rolodexter" target="_blank" rel="noopener noreferrer" className="text-lab-black hover:text-lab-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/rolodexter" target="_blank" rel="noopener noreferrer" className="text-lab-black hover:text-lab-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/rolodexter" target="_blank" rel="noopener noreferrer" className="text-lab-black hover:text-lab-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider mb-6 headline-border">Knowledge</h3>
            <ul className="space-y-4">
              <li><Link href="/knowledge/research" className="font-serif hover:underline">Research</Link></li>
              <li><Link href="/knowledge/intelligence" className="font-serif hover:underline">Intelligence</Link></li>
              <li><Link href="/knowledge/services" className="font-serif hover:underline">Services</Link></li>
              <li><Link href="/knowledge/ecosystem" className="font-serif hover:underline">Ecosystem</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider mb-6 headline-border">Products</h3>
            <ul className="space-y-4">
              <li><Link href="/products/rolodexterVS" className="font-serif hover:underline">rolodexterVS</Link></li>
              <li><Link href="/products/linuxAI" className="font-serif hover:underline">LinuxAI</Link></li>
              <li><Link href="/products/knowledge-engine" className="font-serif hover:underline">Knowledge Engine</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider mb-6 headline-border">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="font-serif hover:underline">About</Link></li>
              <li><Link href="/contact" className="font-serif hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="font-serif hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="font-serif hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter subscription */}
        <div className="border-t border-b border-lab-gray-200 py-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p className="font-serif mb-6">Stay up to date with the latest intelligence research and knowledge management tools.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-grow px-4 py-3 bg-transparent border border-lab-black focus:outline-none font-mono text-sm"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer bottom with copyright */}
        <div className="text-center">
          <div className="inline-block border-t border-lab-black pt-8 px-12">
            <p className="font-mono text-xs text-lab-gray-600 tracking-wide">
              &copy; {currentYear} rolodexterLABS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
