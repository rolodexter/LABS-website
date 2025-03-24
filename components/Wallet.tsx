import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  description: string;
  createdAt: string;
}

interface WalletData {
  id: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export default function Wallet() {
  const { data: session } = useSession();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, [session]);

  const fetchWallet = async () => {
    try {
      const response = await fetch('/api/wallet');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || loading) return;

    setLoading(true);
    try {
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setWallet(data.wallet);
      setAmount('');
    } catch (error) {
      console.error('Error adding funds:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="bg-black text-white p-6 rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold mb-4">Your Wallet</h2>
      
      <div className="mb-6">
        <p className="text-lg">
          Balance: {wallet?.balance.toFixed(2)} {wallet?.currency}
        </p>
      </div>

      <form onSubmit={handleAddFunds} className="mb-6">
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="bg-transparent border border-white/20 rounded px-3 py-2 w-full"
            min="0"
            step="0.01"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-white text-black rounded hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Funds'}
          </button>
        </div>
      </form>

      {wallet?.transactions?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Recent Transactions</h3>
          <div className="space-y-2">
            {wallet.transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center border-b border-white/10 py-2"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm opacity-70">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className={tx.type === 'DEPOSIT' ? 'text-green-400' : ''}>
                  {tx.type === 'DEPOSIT' ? '+' : '-'}
                  {tx.amount} {tx.currency}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}