import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing slug parameter' });
  }

  try {
    // Path to research content
    const filePath = path.join(process.cwd(), 'content', 'research', `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Research article not found' });
    }
    
    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Return the parsed content
    return res.status(200).json({ 
      frontmatter,
      content
    });
  } catch (error) {
    console.error('Error fetching research article:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
