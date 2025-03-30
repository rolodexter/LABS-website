import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

// Ensure session type includes ID by reference to auth declarations
import 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get wallet balance
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const wallet = await prisma.wallet.findUnique({
        where: { userId: session.user.id },
        include: { transactions: { take: 5, orderBy: { createdAt: 'desc' } } }
      });

      if (!wallet) {
        // Create wallet if it doesn't exist
        const newWallet = await prisma.wallet.create({
          data: { userId: session.user.id }
        });
        return res.json(newWallet);
      }

      return res.json(wallet);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Add funds to wallet
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session?.user?.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { amount, currency = 'USD' } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      // Start transaction to ensure data consistency
      const result = await prisma.$transaction(async (tx) => {
        // Get or create wallet
        let wallet = await tx.wallet.findUnique({
          where: { userId: session.user.id }
        });

        if (!wallet) {
          wallet = await tx.wallet.create({
            data: { userId: session.user.id }
          });
        }

        // Create transaction record
        const transaction = await tx.transaction.create({
          data: {
            amount,
            currency,
            type: 'DEPOSIT',
            status: 'COMPLETED',
            description: 'Wallet funding',
            userId: session.user.id,
            walletId: wallet.id
          }
        });

        // Update wallet balance
        const updatedWallet = await tx.wallet.update({
          where: { id: wallet.id },
          data: { balance: { increment: amount } }
        });

        return { wallet: updatedWallet, transaction };
      });

      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 