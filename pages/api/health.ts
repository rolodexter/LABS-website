import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/lib/db';

type HealthStatus = {
  status: string;
  timestamp: string;
  database: string;
  environment: string;
  pid?: number;
};

/**
 * Health check endpoint for Railway deployment
 * Verifies database connectivity and service health
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthStatus>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'unknown',
      environment: process.env.NODE_ENV || 'development'
    });
  }

  try {
    // Minimal health check without blocking on database
    const baseHealthCheck: HealthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'unknown',
      pid: process.pid
    };

    // Optional database check that doesn't block the health endpoint
    try {
      const dbResult = await Promise.race([
        pool.query('SELECT 1 as result'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), 2000))
      ]);

      baseHealthCheck.database = 'connected';
    } catch (dbError) {
      console.warn('Database health check failed:', dbError);
      baseHealthCheck.database = 'disconnected';
    }

    return res.status(200).json(baseHealthCheck);
  } catch (error) {
    console.error('Unexpected health check error:', error);
    
    return res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'unknown',
      environment: process.env.NODE_ENV || 'development',
      pid: process.pid
    });
  }
}