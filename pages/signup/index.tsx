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
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name" className="text-black dark:text-white" />
              <TextInput
                id="lastName"
                type="text"
                required
                className="w-full"
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
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" className="text-black dark:text-white" />
            <TextInput
              id="password"
              type="password"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" value="Confirm Password" className="text-black dark:text-white" />
            <TextInput
              id="confirmPassword"
              type="password"
              required
              className="w-full"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded focus:ring-black dark:focus:ring-white"
                required
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-black dark:text-white hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-black dark:text-white hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
          <Link href="/login" className="text-black dark:text-white hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
