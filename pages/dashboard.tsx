import type { ReactElement } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Dashboard(): ReactElement {
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to rolodexterLABS</h1>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
            <div className="space-y-2">
              {user.email && (
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {user.email.address}
                </p>
              )}
              {user.wallet && (
                <p className="text-gray-600">
                  <span className="font-medium">Wallet:</span> {user.wallet.address}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Connected Accounts</h2>
            <div className="flex flex-wrap gap-4">
              {user.linkedAccounts.map((account) => (
                <div key={account.type} className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
                  {account.type === 'email' && (
                    <>
                      <Image src="/icons/email.svg" alt="Email" width={20} height={20} />
                      <span className="text-sm text-gray-600">{(account as any).email}</span>
                    </>
                  )}
                  {account.type === 'wallet' && (
                    <>
                      <Image src="/icons/wallet.svg" alt="Wallet" width={20} height={20} />
                      <span className="text-sm text-gray-600">{(account as any).address}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
