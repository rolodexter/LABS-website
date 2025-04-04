import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/lib/db';

type HealthStatus = {
  status: string;
  timestamp: string;
  database: string;
  environment: string;
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
    // Test database connection
    const dbResult = await pool.query('SELECT 1 as result');
    const dbConnected = dbResult.rows.length > 0 && dbResult.rows[0].result === 1;

    if (dbConnected) {
      return res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        environment: process.env.NODE_ENV || 'development'
      });
    } else {
      throw new Error('Database query did not return expected result');
    }
  } catch (error) {
    console.error('Health check error:', error);
    
    return res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      environment: process.env.NODE_ENV || 'development'
    });
  }
}