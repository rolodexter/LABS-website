import type { ReactElement } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard(): ReactElement {
  const { ready, authenticated, user, logout, connectWallet, linkEmail, linkGoogle, linkTwitter } = usePrivy();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

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

  const renderAccountIcon = (type) => {
    switch (type) {
      case 'email':
        return '/icons/email.svg';
      case 'wallet':
        return '/icons/wallet.svg';
      case 'google':
        return '/icons/google.svg';
      case 'github':
        return '/icons/github.svg';
      case 'twitter':
        return '/icons/twitter.svg';
      default:
        return '/icons/account.svg';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'profile' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'accounts' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Linked Accounts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'settings' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Settings
            </button>
          </nav>
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={() => logout()}
              className="w-full px-4 py-2 bg-white border border-black text-black rounded hover:bg-black hover:text-white transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
          {activeTab === 'profile' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Profile</h1>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900">Account Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {user.email && (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="mt-1 text-gray-900">{user.email.address}</p>
                      </div>
                    )}
                    {user.wallet && (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Wallet</p>
                        <p className="mt-1 text-gray-900 truncate">{user.wallet.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Linked Accounts</h1>
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Connect multiple accounts to enhance your rolodexterLABS experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.linkedAccounts && user.linkedAccounts.length > 0 ? (
                    user.linkedAccounts.map((account, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-md">
                        <div className="w-8 h-8 relative flex-shrink-0">
                          <Image
                            src={renderAccountIcon(account.type)}
                            alt={account.type}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900 capitalize">{account.type}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {account.type === 'email' ? (account as any).email :
                             account.type === 'wallet' ? (account as any).address : 'Connected'}
                          </p>
                        </div>
                        <button className="ml-4 text-sm text-gray-500 hover:text-red-500">
                          Disconnect
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center p-6 bg-gray-50 rounded-md">
                      <p className="text-gray-600">No accounts connected yet.</p>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Add new accounts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={connectWallet}
                      className="flex items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium">Connect Wallet</span>
                    </button>
                    <button 
                      onClick={() => linkGoogle()}
                      className="flex items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium">Connect Google</span>
                    </button>
                    <button 
                      onClick={() => user.linkGithub()}
                      className="flex items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium">Connect GitHub</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Customize your account settings and preferences.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-black rounded border-gray-300" />
                      <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-black rounded border-gray-300" />
                      <span className="ml-2 text-sm text-gray-700">Product updates</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
