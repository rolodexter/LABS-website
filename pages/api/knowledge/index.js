import { queryKnowledgeModules } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filters = {
      category: req.query.category,
      status: req.query.status,
      tags: req.query.tags?.split(',').filter(Boolean),
      showInactive: req.query.showInactive === 'true'
    };

    const modules = await queryKnowledgeModules(filters);
    res.status(200).json(modules);
  } catch (error) {
    console.error('Error querying knowledge modules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
