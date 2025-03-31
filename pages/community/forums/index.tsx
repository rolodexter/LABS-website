import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Forums() {
  const categories = [
    {
      name: 'General Discussion',
      description: 'General discussions about AI and technology',
      topics: 245,
      posts: 1893
    },
    {
      name: 'Technical Support',
      description: 'Get help with rolodexter products and services',
      topics: 189,
      posts: 1456
    },
    {
      name: 'Product Feedback',
      description: 'Share your feedback and suggestions',
      topics: 134,
      posts: 987
    }
  ];

  const recentTopics = [
    {
      title: 'Best practices for AI model deployment',
      author: 'Sarah Chen',
      replies: 23,
      views: 156,
      lastPost: '10 minutes ago'
    },
    {
      title: 'Getting started with rolodexterVS',
      author: 'James Wilson',
      replies: 45,
      views: 342,
      lastPost: '1 hour ago'
    },
    {
      title: 'LARP event organization tips',
      author: 'Emma Roberts',
      replies: 12,
      views: 89,
      lastPost: '2 hours ago'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Community Forums</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Join the discussion with fellow developers and enthusiasts
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2 text-black dark:text-white">568</h3>
            <p className="text-gray-600 dark:text-gray-400">Topics</p>
          </div>
        </Card>
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2 text-black dark:text-white">4,336</h3>
            <p className="text-gray-600 dark:text-gray-400">Posts</p>
          </div>
        </Card>
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2 text-black dark:text-white">2,145</h3>
            <p className="text-gray-600 dark:text-gray-400">Members</p>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Categories</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <Card key={category.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {category.topics} topics • {category.posts} posts
                    </div>
                  </div>
                  <Button
                    as={Link}
                    href={`/community/forums/${category.name.toLowerCase().replace(/ /g, '-')}`}
                    className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    View Topics
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Recent Topics</h2>
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <Card key={topic.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold mb-2 text-black dark:text-white">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  by {topic.author}
                </p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{topic.replies} replies</span>
                  <span>{topic.views} views</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Last post: {topic.lastPost}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Button
              as={Link}
              href="/community/forums/new"
              className="w-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              Start New Topic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
