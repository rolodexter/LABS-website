import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const KNOWLEDGE_DIRECTORY = path.join(process.cwd(), 'content/knowledge');

export interface KnowledgeModule {
  slug: string;
  frontMatter: {
    title: string;
    slug: string;
    category: string;
    agent_author: string[];
    agent_curated_by: string[];
    agent_historian: string[];
    last_updated: string;
    status: string;
    summary: string;
    layout: string;
    thought_process: Array<{
      by: string;
      timestamp: string;
      note: string;
    }>;
  };
  content: string;
}

export async function getAllKnowledgeModules(): Promise<KnowledgeModule[]> {
  const modules: KnowledgeModule[] = [];
  
  // Get all subdirectories in the knowledge directory
  const subdirs = fs.readdirSync(KNOWLEDGE_DIRECTORY)
    .filter(dir => fs.statSync(path.join(KNOWLEDGE_DIRECTORY, dir)).isDirectory());
  
  // Process each subdirectory
  for (const subdir of subdirs) {
    const subdirPath = path.join(KNOWLEDGE_DIRECTORY, subdir);
    
    // Get all MDX files in the subdirectory
    const files = fs.readdirSync(subdirPath)
      .filter(file => file.endsWith('.mdx'));
    
    // Process each MDX file
    for (const file of files) {
      const filePath = path.join(subdirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      modules.push({
        slug: data.slug,
        frontMatter: data as any,
        content
      });
    }
  }
  
  return modules;
}

export async function getKnowledgeModuleBySlug(slug: string): Promise<KnowledgeModule | null> {
  const modules = await getAllKnowledgeModules();
  return modules.find(module => module.slug === slug) || null;
}

export async function getKnowledgeModulesByCategory(category: string): Promise<KnowledgeModule[]> {
  const modules = await getAllKnowledgeModules();
  return modules.filter(module => module.frontMatter.category === category);
}

export async function getSerializedKnowledgeModule(slug: string) {
  const module = await getKnowledgeModuleBySlug(slug);
  
  if (!module) return null;
  
  const mdxSource = await serialize(module.content);
  
  return {
    frontMatter: module.frontMatter,
    mdxSource
  };
}

export function getCategoryPath(category: string): string {
  return `/${category.replace(/\//g, '/')}`;
}

export function getKnowledgeModulePath(module: KnowledgeModule): string {
  const categoryPath = getCategoryPath(module.frontMatter.category);
  return `${categoryPath}/${module.slug}`;
}
