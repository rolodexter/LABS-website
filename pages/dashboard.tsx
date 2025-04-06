import type { ReactElement } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Dashboard(): ReactElement {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const router = useRouter();
  
  // Debug logging
  console.log('Privy Auth State:', { ready, authenticated, userId: user?.id });

  if (!ready) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-black text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-white">Initializing authentication...</p>
      </div>
    );
  }
  
  if (!authenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-black text-white">
        <h1 className="text-3xl font-bold mb-8">rolodexterLABS Dashboard</h1>
        <p className="text-lg mb-8">Please sign in to access your personalized dashboard.</p>
        <button 
          onClick={() => login()}
          className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
        >
          Sign In with Privy
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button 
            onClick={() => logout()}
            className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Welcome, {user?.email?.address || user?.twitter?.username || user?.github?.username || 'User'}</h2>
          <p className="text-gray-300">Your personalized dashboard is now available.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4">Connected Accounts</h3>
            <div className="space-y-4">
              {user?.linkedAccounts?.map((account: any, index: number) => (
                <div key={index} className="flex items-center p-3 border border-white/10 rounded">
                  <div className="text-white">{account.type}</div>
                </div>
              ))}
              {(!user?.linkedAccounts || user.linkedAccounts.length === 0) && (
                <p className="text-gray-400">No linked accounts found. Use the Privy dashboard to link additional accounts.</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="text-xl font-bold text-white">1</p>
              <p className="text-sm text-gray-400">Projects</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="text-xl font-bold text-white">3</p>
              <p className="text-sm text-gray-400">API Calls</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Models</p>
            </div>
            <div className="p-4 border border-white/10 rounded-lg">
              <p className="text-xl font-bold text-white">2</p>
              <p className="text-sm text-gray-400">Documents</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-8">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <p className="text-gray-400">Your activity feed will appear here once you start using rolodexterLABS products.</p>
        </div>
      </div>
    </div>
  );
}

// Add custom layout function to prevent duplicate footer
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};

export default Dashboard;
