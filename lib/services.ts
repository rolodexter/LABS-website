import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import servicesData from '@/data/services.json';

const SERVICES_DIRECTORY = path.join(process.cwd(), 'content/services');

export interface ServiceContent {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  status: string;
  linkedAgent?: string;
  icon?: string;
  content: string;
}

export async function getServiceContent(slug: string): Promise<ServiceContent | null> {
  // Find the service in services.json
  const serviceInfo = servicesData.find(s => s.slug === slug);
  if (!serviceInfo || !serviceInfo.source) return null;
  
  // Create the file path
  const filePath = path.join(SERVICES_DIRECTORY, serviceInfo.source);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) return null;
  
  // Read and parse the file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    id: serviceInfo.id,
    slug: serviceInfo.slug,
    title: data.title || serviceInfo.title,
    category: data.category || serviceInfo.category,
    description: data.description || '',
    status: data.status || serviceInfo.status,
    linkedAgent: data.linkedAgent || serviceInfo.linkedAgent,
    icon: data.icon || serviceInfo.icon,
    content
  };
}

export async function getAllServicesByCategory(): Promise<Record<string, ServiceContent[]>> {
  const servicesByCategory: Record<string, ServiceContent[]> = {};
  
  for (const serviceInfo of servicesData) {
    if (!serviceInfo.source) continue;
    
    const serviceContent = await getServiceContent(serviceInfo.slug);
    if (!serviceContent) continue;
    
    if (!servicesByCategory[serviceContent.category]) {
      servicesByCategory[serviceContent.category] = [];
    }
    
    servicesByCategory[serviceContent.category].push(serviceContent);
  }
  
  return servicesByCategory;
}

export function getServiceDescription(service: any): string {
  if (!service) return '';

  // First few sentences of content, removing markdown formatting
  if (service.content) {
    const contentWithoutHeadings = service.content
      .replace(/^#.*$/gm, '') // Remove headings
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .trim();
    
    // Extract the first paragraph (likely the service description)
    const firstParagraph = contentWithoutHeadings.split('\n\n')[0].trim();
    
    if (firstParagraph) return firstParagraph;
  }
  
  // Custom descriptions based on service type if content not available
  const descriptions: Record<string, string> = {
    'waas': 'I build workflow systems that coordinate knowledge workers and integrate them into your existing processes.',
    'model-development': 'I create bespoke intelligence models tailored to your specific knowledge domain and operational requirements.',
    'model-training': 'I transform your proprietary data into knowledge assets through specialized training methodologies.',
    'model-orchestration': 'I design systems that coordinate multiple intelligence models to work together on complex tasks.',
    'model-deployment': 'I implement production-ready intelligence infrastructure that scales with your operational needs.',
    'metascience': 'I develop research systems that accelerate scientific discovery through structured knowledge manufacturing.',
    'synthetic-discovery': 'I build intelligence systems focused on exploring materials and compounds within scientific constraints.',
    'blockchain-services': 'I implement distributed ledger infrastructure to support verifiable computation and knowledge assets.',
    'worker-design': 'I create specialized intelligence workers optimized for specific operational tasks and knowledge domains.',
  };
  
  return descriptions[service.id] || 'I manufacture intelligence solutions tailored to your specific operational requirements.';
}
