import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">Welcome to rolodexterLABS</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 fade-in delay-1">
              AI-Driven Intelligence & Automated Workflows
            </p>
            <div className="flex flex-wrap justify-center gap-4 fade-in delay-2">
              <Link href="/products/applications/rolodextervs" 
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors">
                Explore Products
              </Link>
              <Link href="/login" 
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">Intelligence</h3>
              <p className="text-gray-300 mb-4">
                Advanced AI solutions delivering executive and distributed intelligence for modern enterprises. 
                Transform data into actionable insights with our cutting-edge models.
              </p>
              <Link href="/services/intelligence/executive" className="text-white hover:underline">
                Learn more →
              </Link>
            </div>
            <div className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">Workforces</h3>
              <p className="text-gray-300 mb-4">
                Scale your operations with AI-powered workforces designed for any level of complexity.
                Optimize processes and enhance productivity with intelligent automation.
              </p>
              <Link href="/services/workforces/scale" className="text-white hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">rolodexterVS</h3>
              <p className="text-gray-300 mb-4">
                Advanced AI-augmented development environment that transcends traditional coding assistants.
              </p>
              <Link href="/products/applications/rolodextervs" className="text-white hover:underline">
                Explore →
              </Link>
            </div>
            <div className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">rolodexterGPT</h3>
              <p className="text-gray-300 mb-4">
                Next-generation AI system with advanced multi-model orchestration and semantic understanding.
              </p>
              <Link href="/products/applications/rolodextergpt" className="text-white hover:underline">
                Explore →
              </Link>
            </div>
            <div className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">Economic Kernels</h3>
              <p className="text-gray-300 mb-4">
                Innovative economic systems with built-in incentive mechanisms and self-balancing properties.
              </p>
              <Link href="/products/applications/economics/kernels" className="text-white hover:underline">
                Explore →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-transparent to-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the future of AI-driven intelligence and automated workflows with rolodexterLABS.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/community" 
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors">
              Join Our Community
            </Link>
            <Link href="/company/contact" 
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}