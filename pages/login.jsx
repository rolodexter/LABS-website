import { useRouter } from 'next/router';
import Link from 'next/link';

// Prevent server-side rendering issues with Privy
export const config = {
  unstable_runtimeJS: true
};

export default function Login() {
  const router = useRouter();

  // Temporary function that goes to dashboard without auth
  const handleTemporaryLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">rolodexterLABS</h2>
          <p className="mt-2 text-sm opacity-60">AI-Driven Intelligence & Automated Workflows</p>
        </div>

        <div className="mt-8 space-y-5">
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Authentication Notice</h3>
            <p className="mb-4">
              Our authentication system is temporarily under maintenance.
              You can view a demo version of the dashboard without logging in.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleTemporaryLogin}
              className="w-full flex items-center justify-center px-4 py-3 bg-white text-black hover:bg-white/90 transition-colors rounded-lg"
            >
              View Demo Dashboard
            </button>
            <Link href="/" className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg">
              Back to Home
            </Link>
          </div>
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