import { getKnowledgeModule } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    const module = await getKnowledgeModule(slug);
    
    if (!module) {
      return res.status(404).json({ error: 'Knowledge module not found' });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error('Error fetching knowledge module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
