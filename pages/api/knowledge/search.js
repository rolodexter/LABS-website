import { searchKnowledgeModules } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q: searchQuery, ...filterParams } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const filters = {
      category: filterParams.category,
      status: filterParams.status,
      tags: filterParams.tags?.split(',').filter(Boolean),
      showInactive: filterParams.showInactive === 'true'
    };

    const results = await searchKnowledgeModules(searchQuery, filters);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching knowledge modules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
