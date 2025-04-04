const { Pool } = require('pg');

// Configure PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Helper to safely build WHERE clauses
const buildWhereClause = (filters) => {
  const conditions = [];
  const values = [];
  let paramCount = 1;

  if (filters.category) {
    conditions.push(`category = $${paramCount}`);
    values.push(filters.category);
    paramCount++;
  }

  if (filters.status) {
    conditions.push(`status = $${paramCount}`);
    values.push(filters.status);
    paramCount++;
  }

  if (filters.tags && filters.tags.length > 0) {
    conditions.push(`tags && $${paramCount}`);
    values.push(filters.tags);
    paramCount++;
  }

  // Always only show active modules unless explicitly requested
  if (filters.showInactive !== true) {
    conditions.push('is_active = true');
  }

  return {
    whereClause: conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '',
    values
  };
};

// Query knowledge modules with filters
async function queryKnowledgeModules(filters = {}) {
  const { whereClause, values } = buildWhereClause(filters);
  
  const query = `
    SELECT *
    FROM knowledge_modules
    ${whereClause}
    ORDER BY last_updated DESC;
  `;
  
  const result = await pool.query(query, values);
  return result.rows;
}

// Full-text search across knowledge modules
async function searchKnowledgeModules(searchQuery, filters = {}) {
  const { whereClause, values } = buildWhereClause(filters);
  let paramCount = values.length + 1;

  // Create search configuration
  const searchConfig = `
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(thought_process, '')), 'B') ||
    setweight(to_tsvector('english', array_to_string(tags, ' ')), 'C') ||
    setweight(to_tsvector('english', array_to_string(ai_keywords, ' ')), 'C')
  `;

  const query = `
    SELECT *,
           ts_rank(${searchConfig}, plainto_tsquery('english', $${paramCount})) as rank
    FROM knowledge_modules
    ${whereClause}
    ${whereClause ? 'AND' : 'WHERE'} ${searchConfig} @@ plainto_tsquery('english', $${paramCount})
    ORDER BY rank DESC, last_updated DESC;
  `;

  const result = await pool.query(query, [...values, searchQuery]);
  return result.rows;
}

// Get a single knowledge module by slug
async function getKnowledgeModule(slug) {
  const query = `
    SELECT *
    FROM knowledge_modules
    WHERE slug = $1 AND is_active = true;
  `;
  
  const result = await pool.query(query, [slug]);
  return result.rows[0];
}

// Add user-related functions to the database utilities

// Create or update a user record
async function syncUser(userData) {
  const { privyId, email, walletAddress, githubHandle, googleId, twitterHandle } = userData;
  
  try {
    // Check if user exists
    const checkQuery = `
      SELECT * FROM "User" WHERE "privyId" = $1;
    `;
    const existingUser = await pool.query(checkQuery, [privyId]);
    
    if (existingUser.rows.length > 0) {
      // Update existing user
      const updateQuery = `
        UPDATE "User"
        SET "email" = COALESCE($2, "email"),
            "walletAddress" = COALESCE($3, "walletAddress"),
            "githubHandle" = COALESCE($4, "githubHandle"),
            "googleId" = COALESCE($5, "googleId"),
            "twitterHandle" = COALESCE($6, "twitterHandle")
        WHERE "privyId" = $1
        RETURNING *;
      `;
      
      const result = await pool.query(updateQuery, [
        privyId, 
        email || null, 
        walletAddress || null, 
        githubHandle || null, 
        googleId || null, 
        twitterHandle || null
      ]);
      
      return result.rows[0];
    } else {
      // Create new user
      const insertQuery = `
        INSERT INTO "User" ("privyId", "email", "walletAddress", "githubHandle", "googleId", "twitterHandle")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      
      const result = await pool.query(insertQuery, [
        privyId, 
        email || null, 
        walletAddress || null, 
        githubHandle || null, 
        googleId || null, 
        twitterHandle || null
      ]);
      
      return result.rows[0];
    }
  } catch (error) {
    console.error('Error in syncUser:', error);
    throw error;
  }
}

// Get user by Privy ID
async function getUserByPrivyId(privyId) {
  try {
    const query = `
      SELECT * FROM "User"
      WHERE "privyId" = $1;
    `;
    
    const result = await pool.query(query, [privyId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error in getUserByPrivyId:', error);
    throw error;
  }
}

module.exports = {
  pool,
  queryKnowledgeModules,
  searchKnowledgeModules,
  getKnowledgeModule,
  syncUser,
  getUserByPrivyId
};
