import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">rolodexterLABS</h3>
            <p className="text-sm text-gray-400 mb-4">
              AI-Driven Intelligence & Automated Workflows
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} rolodexterLABS. All rights reserved.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm">Services</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-white text-sm">Documentation</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4 - Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;