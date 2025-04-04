import type { NextApiRequest, NextApiResponse } from 'next';
import { syncUser } from '@/lib/db';

// Type for the response data
type SyncResponse = {
  success: boolean;
  message: string;
  user?: any;
};

/**
 * Sync user data from Privy with our database
 * 
 * This endpoint handles:
 * - Creating new users when they first authenticate
 * - Updating user info when they link new accounts
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SyncResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Extract user data from request body
    const { privyId, email, walletAddress, linkedAccounts } = req.body;

    // Validate required fields
    if (!privyId) {
      return res.status(400).json({ success: false, message: 'Missing privyId' });
    }

    // Process linked accounts to extract relevant info
    let githubHandle = null;
    let googleId = null;
    let twitterHandle = null;

    if (linkedAccounts && Array.isArray(linkedAccounts)) {
      // Look through linked accounts to find specific provider info
      linkedAccounts.forEach((account: any) => {
        switch (account.type) {
          case 'github':
            githubHandle = account.username || null;
            break;
          case 'google':
            googleId = account.id || null;
            break;
          case 'twitter':
            twitterHandle = account.username || null;
            break;
        }
      });
    }

    // Sync user with database
    const user = await syncUser({
      privyId,
      email,
      walletAddress,
      githubHandle,
      googleId,
      twitterHandle
    });

    // Return success response with user data
    return res.status(200).json({
      success: true,
      message: 'User synchronized successfully',
      user
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to sync user data'
    });
  }
}