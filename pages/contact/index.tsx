import { Button, Card, Input, Textarea } from '@/components/ui';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-16">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <Card variant="default" padding="lg">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company
              </label>
              <Input
                id="company"
                type="text"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                required
                rows={4}
              />
            </div>
            
            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </form>
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
