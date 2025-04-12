import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Health check endpoint for Railway deployment
 * Verifies service health
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  }

  res.status(200).json({ status: 'ok' });
}