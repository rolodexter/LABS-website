import { pool } from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const result = await pool.query(
      'SELECT * FROM get_related_modules($1, $2)',
      [slug, limit]
    );

    // Group results by relationship type
    const groupedResults = result.rows.reduce((acc, module) => {
      const type = module.relationship_type;
      if (!acc[type]) {
        acc[type] = [];
      }
      delete module.relationship_type;
      delete module.relevance_score;
      acc[type].push(module);
      return acc;
    }, {});

    res.status(200).json({
      dependencies: groupedResults.dependency || [],
      sameCategory: groupedResults.category || [],
      sharedTags: groupedResults.shared_tags || []
    });
  } catch (error) {
    console.error('Error fetching related modules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
