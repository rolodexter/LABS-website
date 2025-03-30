import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ 
    message: 'Auth debug endpoint is working',
    routes: {
      nextauth: '/api/auth/[...nextauth]',
    },
    timestamp: new Date().toISOString()
  });
} 