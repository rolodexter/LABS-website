import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const { login, ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">rolodexterLABS</h1>
          <p className="text-lg text-gray-600 mb-8">
            Frontier AI tools for executive intelligence
          </p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <button
              onClick={login}
              className="w-full py-3 px-4 border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              By signing in, you agree to our{' '}
              <a href="#" className="underline hover:text-black">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-black">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
