import { Button, Card, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 flex justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white text-center">Login</h1>
        <form className="space-y-4">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded focus:ring-black dark:focus:ring-white"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
          <Link href="/signup" className="text-black dark:text-white hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
