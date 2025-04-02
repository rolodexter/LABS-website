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
