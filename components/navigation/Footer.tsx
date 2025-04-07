import Link from 'next/link';

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: 'https://rolodexterlabs.substack.com/' },
        { label: 'Press', href: '/press' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Forums', href: 'https://github.com/rolodexter/rolodexter/discussions' },
        { label: 'Events', href: 'https://lu.ma/rolodexterLABS' },
        { label: 'Discord', href: 'https://discord.gg/rolodexter' },
        { label: 'Telegram', href: 'https://t.me/rolodexter' },
        { label: 'Twitter', href: 'https://x.com/joemaristela' },
      ],
    },
    {
      title: 'Popular Research',
      links: [
        { label: 'Systems Integration', href: '/research?topic=Systems+Integration' },
        { label: 'Computational Biology', href: '/research?category=Computational+Biology' },
        { label: 'AI Market Analysis', href: '/research?topic=AI+Market+Analysis' },
        { label: 'Quantum Biology', href: '/research?topic=Quantum+Biology' },
        { label: 'Scientific AI', href: '/research?topic=Scientific+AI' },
        { label: 'All Research Areas', href: '/research' },
      ],
    },
    {
      title: 'Investors & Partners',
      links: [
        { label: 'Investor Relations', href: '/investors' },
        { label: 'Partnerships', href: '/partners' },
        { label: 'Ecosystem', href: '/ecosystem' },
        { label: 'Governance', href: '/governance' },
        { label: 'Whitepaper', href: '/whitepaper' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: '/legal/terms' },
        { label: 'Privacy Policy', href: '/legal/privacy' },
        { label: 'Cookie Policy', href: '/legal/cookies' },
        { label: 'Security & Compliance', href: '/legal/security' },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4 text-black dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              {new Date().getFullYear()} rolodexterLABS. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://x.com/joemaristela"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/rolodexter"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                GitHub
              </Link>
              <Link
                href="https://discord.gg/rolodexter"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
