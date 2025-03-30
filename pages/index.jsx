import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">rolodexterLABS</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10">
              AI-Driven Intelligence & Automated Workflows
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services" 
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors">
                Our Services
              </Link>
              <Link href="/login" 
                className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Welcome to Our Platform</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            This is a placeholder for the main content area. We're rebuilding this page from scratch
            with a clean, minimalist design focused on user experience.
          </p>
        </div>
      </section>
    </div>
  );
}