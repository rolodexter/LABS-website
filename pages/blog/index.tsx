import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Blog() {
  const featuredPosts = [
    {
      title: 'The Future of AI Development',
      excerpt: 'Exploring upcoming trends and innovations in artificial intelligence.',
      author: 'Dr. Sarah Chen',
      date: 'March 28, 2025',
      category: 'Technology',
      readTime: '5 min read'
    },
    {
      title: 'Building Ethical AI Systems',
      excerpt: 'Best practices for developing responsible AI solutions.',
      author: 'James Wilson',
      date: 'March 25, 2025',
      category: 'Ethics',
      readTime: '7 min read'
    }
  ];

  const recentPosts = [
    {
      title: 'AI in Healthcare: A New Frontier',
      excerpt: 'How AI is transforming medical diagnosis and treatment.',
      author: 'Dr. Michael Lee',
      date: 'March 20, 2025',
      category: 'Healthcare',
      readTime: '6 min read'
    },
    {
      title: 'The Rise of LARP Technology',
      excerpt: 'Integrating AI into live action role-playing experiences.',
      author: 'Emma Roberts',
      date: 'March 18, 2025',
      category: 'Entertainment',
      readTime: '4 min read'
    },
    {
      title: 'Machine Learning Best Practices',
      excerpt: 'Essential guidelines for ML model development.',
      author: 'Alex Thompson',
      date: 'March 15, 2025',
      category: 'Development',
      readTime: '8 min read'
    }
  ];

  const categories = [
    'Technology',
    'Ethics',
    'Healthcare',
    'Entertainment',
    'Development',
    'Research'
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Insights and updates from the rolodexter team
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Featured Posts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <Card key={post.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.category}</span>
                  <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Button
                    as={Link}
                    href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}
                    className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Recent Posts</h2>
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <Card key={post.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.category}</span>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                as={Link}
                href={`/blog/category/${category.toLowerCase()}`}
                className="w-full mb-2 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get the latest insights and updates delivered to your inbox.
        </p>
        <Button
          as={Link}
          href="/newsletter"
          className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          Subscribe Now
        </Button>
      </div>
    </div>
  );
}
