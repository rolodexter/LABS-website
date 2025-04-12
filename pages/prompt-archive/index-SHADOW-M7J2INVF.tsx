import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllPrompts, getAllPromptTags, PromptItem } from '../../lib/promptParser';
import styles from '../../styles/PromptArchive.module.css';

// Define props type
interface PromptArchiveProps {
  prompts: PromptItem[];
  tags: string[];
}

// Define component for each prompt card
const PromptCard = ({ prompt }: { prompt: PromptItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Function to copy prompt content to clipboard
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format date
  const formattedDate = prompt.meta.date 
    ? new Date(prompt.meta.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Unknown date';

  return (
    <div 
      className={`${styles.promptCard} ${expanded ? styles.expanded : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={styles.promptHeader}>
        <div className={styles.promptMeta}>
          <span className={`${styles.promptDirection} ${styles[prompt.direction]}`}>
            {prompt.direction === 'gpt-to-vs' ? 'GPT → VS' : 'VS → GPT'}
          </span>
          <span className={styles.promptDate}>{formattedDate}</span>
        </div>
        <h3 className={styles.promptTitle}>{prompt.meta.title}</h3>
      </div>
      
      <div className={styles.promptPreview}>
        {!expanded && prompt.preview}
      </div>
      
      {expanded && (
        <div className={styles.promptContent}>
          <div className={styles.promptActions}>
            <button 
              className={styles.copyButton}
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className={styles.content}>{prompt.content}</pre>
          
          {prompt.meta.tags && prompt.meta.tags.length > 0 && (
            <div className={styles.promptTags}>
              {prompt.meta.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main component
export default function PromptArchive({ prompts, tags }: PromptArchiveProps) {
  const [filteredPrompts, setFilteredPrompts] = useState<PromptItem[]>(prompts);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedDirection, setSelectedDirection] = useState<string>('all');
  const [showSimulateOnly, setShowSimulateOnly] = useState<boolean>(false);

  // Filter prompts when filters change
  useEffect(() => {
    let filtered = [...prompts];
    
    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(prompt => 
        prompt.meta.tags && prompt.meta.tags.includes(selectedTag)
      );
    }
    
    // Filter by direction
    if (selectedDirection !== 'all') {
      filtered = filtered.filter(prompt => prompt.direction === selectedDirection);
    }
    
    // Filter by simulate flag
    if (showSimulateOnly) {
      filtered = filtered.filter(prompt => prompt.meta.simulate === true);
    }
    
    setFilteredPrompts(filtered);
  }, [prompts, selectedTag, selectedDirection, showSimulateOnly]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Prompt Archive | rolodexterLABS</title>
        <meta name="description" content="Archive of system prompts for rolodexterLABS" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Prompt Archive</h1>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="tag-filter">Filter by tag:</label>
            <select 
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={styles.select}
            >
              <option value="">All tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="direction-filter">Filter by direction:</label>
            <select 
              id="direction-filter"
              value={selectedDirection}
              onChange={(e) => setSelectedDirection(e.target.value)}
              className={styles.select}
            >
              <option value="all">All directions</option>
              <option value="gpt-to-vs">GPT → VS</option>
              <option value="vs-to-gpt">VS → GPT</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox"
                checked={showSimulateOnly}
                onChange={(e) => setShowSimulateOnly(e.target.checked)}
                className={styles.checkbox}
              />
              Show simulate only
            </label>
          </div>
        </div>
        
        <div className={styles.promptCount}>
          Showing {filteredPrompts.length} of {prompts.length} prompts
        </div>
        
        <div className={styles.promptGrid}>
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.meta.id} prompt={prompt} />
            ))
          ) : (
            <div className={styles.noPrompts}>
              No prompts found matching the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Get static props
export const getStaticProps: GetStaticProps = async () => {
  const prompts = getAllPrompts();
  const tags = getAllPromptTags();
  
  return {
    props: {
      prompts,
      tags,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};
