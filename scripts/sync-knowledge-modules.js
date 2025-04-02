const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const crypto = require('crypto');
const { Pool } = require('pg');
const glob = require('glob-promise');

// Configure PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Utility to compute content hash
const computeHash = (content) => {
  return crypto.createHash('sha256').update(content).digest('hex');
};

// Process a single MDX file
async function processMdxFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const { data: frontmatter } = matter(content);
  
  // Compute hash of entire file for change detection
  const contentHash = computeHash(content);
  
  return {
    ...frontmatter,
    content_hash: contentHash,
    // Convert arrays to proper format
    contributors: Array.isArray(frontmatter.contributors) ? frontmatter.contributors : [],
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    ai_keywords: Array.isArray(frontmatter.aiKeywords) ? frontmatter.aiKeywords : [],
    dependencies: Array.isArray(frontmatter.dependencies) ? frontmatter.dependencies : [],
    conceptual_dependencies: Array.isArray(frontmatter.conceptualDependencies) ? frontmatter.conceptualDependencies : [],
    external_dependencies: Array.isArray(frontmatter.externalDependencies) ? frontmatter.externalDependencies : [],
    prerequisites: Array.isArray(frontmatter.prerequisites) ? frontmatter.prerequisites : [],
    outcomes: Array.isArray(frontmatter.outcomes) ? frontmatter.outcomes : [],
    validation: Array.isArray(frontmatter.validation) ? frontmatter.validation : [],
    references: Array.isArray(frontmatter.references) ? frontmatter.references : [],
    changelog: Array.isArray(frontmatter.changelog) ? frontmatter.changelog : [],
    // Convert compatibility matrix to JSONB
    compatibility_matrix: frontmatter.compatibilityMatrix ? JSON.stringify(frontmatter.compatibilityMatrix) : null,
    // Ensure required fields
    review_status: frontmatter.reviewStatus || 'pending',
    complexity: frontmatter.complexity || 'beginner'
  };
}

// Upsert module data to database
async function upsertModule(client, moduleData) {
  const query = `
    INSERT INTO knowledge_modules (
      slug, title, status, version, last_updated, category, subcategory,
      agent_author, contributors, review_status, complexity, estimated_read_time,
      tags, ai_keywords, thought_process, dependencies, conceptual_dependencies,
      api_version, compatibility_matrix, external_dependencies, prerequisites,
      outcomes, validation, references, changelog, content_hash
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      status = EXCLUDED.status,
      version = EXCLUDED.version,
      last_updated = EXCLUDED.last_updated,
      category = EXCLUDED.category,
      subcategory = EXCLUDED.subcategory,
      agent_author = EXCLUDED.agent_author,
      contributors = EXCLUDED.contributors,
      review_status = EXCLUDED.review_status,
      complexity = EXCLUDED.complexity,
      estimated_read_time = EXCLUDED.estimated_read_time,
      tags = EXCLUDED.tags,
      ai_keywords = EXCLUDED.ai_keywords,
      thought_process = EXCLUDED.thought_process,
      dependencies = EXCLUDED.dependencies,
      conceptual_dependencies = EXCLUDED.conceptual_dependencies,
      api_version = EXCLUDED.api_version,
      compatibility_matrix = EXCLUDED.compatibility_matrix,
      external_dependencies = EXCLUDED.external_dependencies,
      prerequisites = EXCLUDED.prerequisites,
      outcomes = EXCLUDED.outcomes,
      validation = EXCLUDED.validation,
      references = EXCLUDED.references,
      changelog = EXCLUDED.changelog,
      content_hash = EXCLUDED.content_hash,
      is_active = true
    RETURNING id, slug;
  `;

  return client.query(query, [
    moduleData.slug,
    moduleData.title,
    moduleData.status,
    moduleData.version,
    moduleData.last_updated,
    moduleData.category,
    moduleData.subcategory,
    moduleData.agent_author,
    moduleData.contributors,
    moduleData.review_status,
    moduleData.complexity,
    moduleData.estimated_read_time,
    moduleData.tags,
    moduleData.ai_keywords,
    moduleData.thought_process,
    moduleData.dependencies,
    moduleData.conceptual_dependencies,
    moduleData.api_version,
    moduleData.compatibility_matrix,
    moduleData.external_dependencies,
    moduleData.prerequisites,
    moduleData.outcomes,
    moduleData.validation,
    moduleData.references,
    moduleData.changelog,
    moduleData.content_hash
  ]);
}

// Mark deleted modules as inactive
async function markDeletedModules(client, existingSlugs) {
  const query = `
    UPDATE knowledge_modules
    SET is_active = false
    WHERE slug NOT IN ($1)
    AND is_active = true
    RETURNING slug;
  `;
  return client.query(query, [existingSlugs]);
}

// Main sync function
async function syncKnowledgeModules() {
  const client = await pool.connect();
  const stats = { added: 0, updated: 0, deleted: 0, errors: [] };
  
  try {
    await client.query('BEGIN');
    
    // Get all MDX files
    const files = await glob('content/knowledge/**/*.mdx');
    const existingSlugs = [];
    
    // Process each file
    for (const file of files) {
      try {
        const moduleData = await processMdxFile(file);
        existingSlugs.push(moduleData.slug);
        
        const result = await upsertModule(client, moduleData);
        if (result.rowCount > 0) {
          stats[result.command === 'INSERT' ? 'added' : 'updated']++;
        }
      } catch (error) {
        stats.errors.push({ file, error: error.message });
      }
    }
    
    // Mark deleted modules
    const deletedResult = await markDeletedModules(client, existingSlugs);
    stats.deleted = deletedResult.rowCount;
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  
  return stats;
}

// Execute if run directly
if (require.main === module) {
  syncKnowledgeModules()
    .then((stats) => {
      console.log('Sync completed successfully:');
      console.log(`Added: ${stats.added}`);
      console.log(`Updated: ${stats.updated}`);
      console.log(`Deleted: ${stats.deleted}`);
      if (stats.errors.length > 0) {
        console.log('\nErrors encountered:');
        stats.errors.forEach(({ file, error }) => {
          console.log(`${file}: ${error}`);
        });
      }
    })
    .catch((error) => {
      console.error('Sync failed:', error);
      process.exit(1);
    });
}

module.exports = { syncKnowledgeModules };
