-- Schema for knowledge module metadata
CREATE TABLE IF NOT EXISTS knowledge_modules (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    version TEXT NOT NULL,
    last_updated TIMESTAMP NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    agent_author TEXT,
    contributors TEXT[],
    review_status TEXT NOT NULL,
    complexity TEXT NOT NULL,
    estimated_read_time TEXT,
    tags TEXT[],
    ai_keywords TEXT[],
    thought_process TEXT,
    dependencies TEXT[],
    conceptual_dependencies TEXT[],
    api_version TEXT,
    compatibility_matrix JSONB,
    external_dependencies TEXT[],
    prerequisites TEXT[],
    outcomes TEXT[],
    validation TEXT[],
    references TEXT[],
    changelog TEXT[],
    content_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Index for faster searches
CREATE INDEX IF NOT EXISTS idx_knowledge_modules_slug ON knowledge_modules(slug);
CREATE INDEX IF NOT EXISTS idx_knowledge_modules_category ON knowledge_modules(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_modules_tags ON knowledge_modules USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_knowledge_modules_ai_keywords ON knowledge_modules USING GIN(ai_keywords);

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updating timestamp
CREATE TRIGGER update_knowledge_modules_updated_at
    BEFORE UPDATE ON knowledge_modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Module dependencies table
CREATE TABLE IF NOT EXISTS module_dependencies (
    id SERIAL PRIMARY KEY,
    module_slug TEXT NOT NULL,
    dependency_slug TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_slug) REFERENCES knowledge_modules(slug),
    FOREIGN KEY (dependency_slug) REFERENCES knowledge_modules(slug),
    UNIQUE(module_slug, dependency_slug)
);

-- Module tags table (for more efficient tag querying)
CREATE TABLE IF NOT EXISTS module_tags (
    id SERIAL PRIMARY KEY,
    module_slug TEXT NOT NULL,
    tag TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_slug) REFERENCES knowledge_modules(slug),
    UNIQUE(module_slug, tag)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_module_dependencies_module ON module_dependencies(module_slug);
CREATE INDEX IF NOT EXISTS idx_module_dependencies_dependency ON module_dependencies(dependency_slug);
CREATE INDEX IF NOT EXISTS idx_module_tags_module ON module_tags(module_slug);
CREATE INDEX IF NOT EXISTS idx_module_tags_tag ON module_tags(tag);

-- Function to find related modules based on various criteria
CREATE OR REPLACE FUNCTION get_related_modules(
    p_module_slug TEXT,
    p_limit INTEGER DEFAULT 5
) RETURNS TABLE (
    slug TEXT,
    title TEXT,
    category TEXT,
    subcategory TEXT,
    status TEXT,
    last_updated TIMESTAMP,
    relationship_type TEXT,
    relevance_score INTEGER
) AS $$
BEGIN
    RETURN QUERY
    -- Combine results from different relationship types
    (
        -- Direct dependencies
        SELECT 
            km.slug,
            km.title,
            km.category,
            km.subcategory,
            km.status,
            km.last_updated,
            'dependency'::TEXT as relationship_type,
            100 as relevance_score
        FROM module_dependencies md
        JOIN knowledge_modules km ON km.slug = md.dependency_slug
        WHERE md.module_slug = p_module_slug
        AND km.is_active = true
    )
    UNION ALL
    (
        -- Same category modules
        SELECT 
            km.slug,
            km.title,
            km.category,
            km.subcategory,
            km.status,
            km.last_updated,
            'category'::TEXT as relationship_type,
            50 as relevance_score
        FROM knowledge_modules km
        WHERE km.category = (
            SELECT category 
            FROM knowledge_modules 
            WHERE slug = p_module_slug
        )
        AND km.slug != p_module_slug
        AND km.is_active = true
    )
    UNION ALL
    (
        -- Shared tags
        SELECT DISTINCT
            km.slug,
            km.title,
            km.category,
            km.subcategory,
            km.status,
            km.last_updated,
            'shared_tags'::TEXT as relationship_type,
            25 as relevance_score
        FROM module_tags mt1
        JOIN module_tags mt2 ON mt1.tag = mt2.tag
        JOIN knowledge_modules km ON km.slug = mt2.module_slug
        WHERE mt1.module_slug = p_module_slug
        AND mt2.module_slug != p_module_slug
        AND km.is_active = true
    )
    ORDER BY relevance_score DESC, last_updated DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
