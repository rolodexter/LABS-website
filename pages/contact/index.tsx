import { Button, Card, Label, TextInput, Textarea  } from '@/components/ui';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" value="First Name" className="text-black dark:text-white" />
                <TextInput
                  id="firstName"
                  type="text"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" value="Last Name" className="text-black dark:text-white" />
                <TextInput
                  id="lastName"
                  type="text"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" value="Email" className="text-black dark:text-white" />
              <TextInput
                id="email"
                type="email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company" value="Company" className="text-black dark:text-white" />
              <TextInput
                id="company"
                type="text"
              />
            </div>
            
            <div>
              <Label htmlFor="message" value="Message" className="text-black dark:text-white" />
              <Textarea
                id="message"
                required
                rows={4}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Office</h2>
            <p className="text-gray-600 dark:text-gray-400">
              123 AI Street<br />
              San Francisco, CA 94105<br />
              United States
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Contact Info</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Email: info@rolodexterlabs.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Hours</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Monday - Friday: 9:00 AM - 6:00 PM PST<br />
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
