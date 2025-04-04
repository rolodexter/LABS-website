// Define the category structure for the rolodexter knowledge base
export type CategoryType = {
  id: string;
  name: string;
  description: string;
  subcategories?: CategoryType[];
  featured?: boolean;
  icon?: string;
};

// Main categories with subcategories
export const categories: CategoryType[] = [
  {
    id: 'research',
    name: 'Research',
    description: 'Cutting-edge research in AI, robotics, and intelligence systems',
    featured: true,
    icon: 'flask',
    subcategories: [
      {
        id: 'research/embodied-ai',
        name: 'Embodied AI',
        description: 'AI systems that interact with the physical world',
        featured: true,
        icon: 'robot'
      },
      {
        id: 'research/ai-scientists',
        name: 'AI Scientists',
        description: 'Autonomous systems for scientific discovery',
        featured: true,
        icon: 'microscope'
      },
      {
        id: 'research/multimodal',
        name: 'Multimodal Intelligence',
        description: 'Systems that process multiple types of information',
        icon: 'brain'
      },
      {
        id: 'research/agent-architectures',
        name: 'Agent Architectures',
        description: 'Designs and frameworks for intelligent agents',
        icon: 'sitemap'
      }
    ]
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    description: 'The rolodexter platform and its components',
    icon: 'network-wired',
    subcategories: [
      {
        id: 'ecosystem/executive-agent-coordination',
        name: 'Executive Agent Coordination',
        description: 'How agents work together in the rolodexter system',
        featured: true,
        icon: 'users-cog'
      },
      {
        id: 'ecosystem/windsurf',
        name: 'WindSurf',
        description: 'Multi-agent simulation environment',
        icon: 'wind'
      },
      {
        id: 'ecosystem/rolodextergpt',
        name: 'rolodexterGPT',
        description: 'The core language model of the rolodexter system',
        icon: 'comment-dots'
      }
    ]
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Products and services offered by rolodexter',
    icon: 'server',
    subcategories: [
      {
        id: 'services/intelligence',
        name: 'Intelligence',
        description: 'AI-powered intelligence services',
        icon: 'brain'
      },
      {
        id: 'services/analytics',
        name: 'Analytics',
        description: 'Data analysis and insights',
        icon: 'chart-line'
      }
    ]
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    description: 'Core concepts in artificial intelligence',
    icon: 'lightbulb',
    subcategories: [
      {
        id: 'intelligence/cognitive-architectures',
        name: 'Cognitive Architectures',
        description: 'Frameworks for modeling human-like intelligence',
        featured: true,
        icon: 'project-diagram'
      },
      {
        id: 'intelligence/knowledge-representation',
        name: 'Knowledge Representation',
        description: 'Methods for storing and organizing information',
        icon: 'database'
      }
    ]
  }
];

// Helper functions for working with categories
export function getCategoryById(id: string): CategoryType | undefined {
  // Check main categories
  const mainCategory = categories.find(cat => cat.id === id);
  if (mainCategory) return mainCategory;
  
  // Check subcategories
  for (const category of categories) {
    if (category.subcategories) {
      const subcat = category.subcategories.find(sub => sub.id === id);
      if (subcat) return subcat;
    }
  }
  
  return undefined;
}

export function getParentCategory(id: string): CategoryType | undefined {
  for (const category of categories) {
    if (category.subcategories) {
      const hasSubcategory = category.subcategories.some(sub => sub.id === id);
      if (hasSubcategory) return category;
    }
  }
  
  return undefined;
}

export function getFeaturedCategories(): CategoryType[] {
  const featured: CategoryType[] = [];
  
  // Add featured main categories
  categories.forEach(cat => {
    if (cat.featured) featured.push(cat);
    
    // Add featured subcategories
    if (cat.subcategories) {
      cat.subcategories.forEach(sub => {
        if (sub.featured) featured.push(sub);
      });
    }
  });
  
  return featured;
}

// Get all subcategories flattened
export function getAllSubcategories(): CategoryType[] {
  const allSubcategories: CategoryType[] = [];
  
  categories.forEach(cat => {
    if (cat.subcategories) {
      allSubcategories.push(...cat.subcategories);
    }
  });
  
  return allSubcategories;
}
