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
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">
          Insights and updates from the rolodexterLABS team
        </p>
      </div>

      {/* Featured Posts */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8">Featured</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <article className="group border border-gray-200 rounded-lg p-8 hover:border-black transition-colors">
                <div className="mb-4">
                  <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date} • {post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
        <div className="space-y-8">
          {recentPosts.map((post, index) => (
            <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <article className="group border-b border-gray-200 pb-8 last:border-0">
                <div className="mb-2">
                  <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date} • {post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <Link
              href={`/blog/category/${category.toLowerCase()}`}
              key={index}
              className="px-4 py-2 border border-gray-200 rounded-full hover:border-black transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
