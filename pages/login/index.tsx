import { Button, Card, Label, TextInput  } from '@/components/ui';
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 bg-white dark:bg-black border-black dark:border-white text-black dark:text-white focus:ring-black dark:focus:ring-white"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-black dark:text-white">
                Remember me
              </label>
            </div>
            <Link 
              href="/forgot-password" 
              className="text-sm text-black dark:text-white hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          >
            Sign in
          </Button>
        </form>
        <div className="text-center mt-4">
          <span className="text-black dark:text-white">Don't have an account? </span>
          <Link 
            href="/signup" 
            className="text-black dark:text-white font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
