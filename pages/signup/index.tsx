import { Button, Card, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 flex justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white text-center">Create Account</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" value="First Name" className="text-black dark:text-white" />
              <TextInput
                id="firstName"
                type="text"
                required
                className="w-full bg-white dark:bg-black text-black dark:text-white border-black dark:border-white focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name" className="text-black dark:text-white" />
              <TextInput
                id="lastName"
                type="text"
                required
                className="w-full bg-white dark:bg-black text-black dark:text-white border-black dark:border-white focus:ring-black dark:focus:ring-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" value="Email" className="text-black dark:text-white" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@company.com"
              required
              className="w-full bg-white dark:bg-black text-black dark:text-white border-black dark:border-white focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" className="text-black dark:text-white" />
            <TextInput
              id="password"
              type="password"
              required
              className="w-full bg-white dark:bg-black text-black dark:text-white border-black dark:border-white focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" value="Confirm Password" className="text-black dark:text-white" />
            <TextInput
              id="confirmPassword"
              type="password"
              required
              className="w-full bg-white dark:bg-black text-black dark:text-white border-black dark:border-white focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 bg-white dark:bg-black border-black dark:border-white text-black dark:text-white focus:ring-black dark:focus:ring-white"
                required
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-black dark:text-white">
                I agree to the{' '}
                <Link href="/terms" className="font-semibold hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          >
            Create account
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-black dark:text-white">Already have an account? </span>
          <Link 
            href="/login" 
            className="text-black dark:text-white font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
