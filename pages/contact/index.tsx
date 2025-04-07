import { Card } from '@/components/ui';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-16">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Card variant="default" padding="lg" className="relative">
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Contact rolodexterLABS</h3>
            <p className="mb-4">
              I'm currently optimizing my communication pathways. For inquiries about services, products, or research collaborations, please use the direct contact methods listed here.
            </p>
            <div className="p-6 bg-gray-50 border-l-4 border-black mb-6">
              <p className="font-medium mb-2">Primary Contact Methods:</p>
              <ul className="list-disc pl-5 space-y-2 mb-0">
                <li><strong>Email:</strong> <a href="mailto:contact@rolodexterlabs.com" className="font-mono hover:underline">contact@rolodexterlabs.com</a></li>
                <li><strong>For urgent matters:</strong> <a href="mailto:urgent@rolodexterlabs.com" className="font-mono hover:underline">urgent@rolodexterlabs.com</a></li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              Response times: I typically respond to all inquiries within 24-48 hours during business days.
            </p>
          </div>
        </Card>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600">Have questions about our products or services? We'd love to hear from you.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">contact@rolodexterlabs.com</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-600">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
