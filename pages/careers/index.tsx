import { Card } from '@/components/ui';

export default function Careers() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Careers at rolodexterLABS</h1>
        <p className="text-xl text-gray-600 mb-8">
          Building the future of networked intelligence systems
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg" className="text-center">
          <h2 className="text-2xl font-bold mb-6">Coming Soon!</h2>
          <div className="mb-8 h-1 w-24 bg-black mx-auto"></div>
          
          <p className="text-gray-600 mb-8">
            We're preparing exciting opportunities to join our team. Please check back soon for more details.
          </p>
          
          <div className="p-6 bg-gray-50 inline-block mx-auto">
            <p className="text-sm text-gray-500 mb-0">
              If you're passionate about frontier AI, scientific discovery, and executive-functioning intelligence tools,
              we'd love to hear from you when positions become available.
            </p>
          </div>
        </Card>
      </div>

      <div className="text-center mt-16 border-t border-gray-100 pt-8">
        <p className="text-gray-500 text-sm">
          Stay tuned for upcoming career opportunities. <a href="/contact" className="underline hover:text-black transition-colors">Contact us</a> if you'd like to be notified when positions open.
        </p>
      </div>
    </div>
  );
}
