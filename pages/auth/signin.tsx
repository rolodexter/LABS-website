import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">Sign in to rolodexterLABS</h2>
          <p className="mt-2 text-sm opacity-60">Connect with your preferred platform</p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => signIn('discord')}
            className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            <span className="mr-2">Discord</span>
          </button>

          <button
            onClick={() => signIn('twitter')}
            className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            <span className="mr-2">X (Twitter)</span>
          </button>

          <button
            onClick={() => signIn('facebook')}
            className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            <span className="mr-2">Facebook</span>
          </button>

          <button
            onClick={() => signIn('telegram')}
            className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            <span className="mr-2">Telegram</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm">
          <p className="opacity-60">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}