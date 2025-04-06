import { ReactElement } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import productsData from '@/data/products.json';
import type { NextPageWithLayout } from '@/types/next';

type ProductStatus = 'Stable' | 'In Development' | 'Planned';

type Product = {
  slug: string;
  title: string;
  category: string;
  family: string;
  status: ProductStatus;
  priority: number;
  path: string;
  isAgent?: boolean;
  description?: string;
};

const Products: NextPageWithLayout = () => {
  // Filter out agents and only show products
  const filteredProducts = productsData.filter(product => !product.isAgent);
  
  // Group products by family and sort by priority
  const productsByFamily = filteredProducts.reduce<Record<string, Product[]>>((acc, product) => {
    const { family } = product;
    if (!acc[family]) {
      acc[family] = [];
    }
    acc[family].push({
      ...product,
      status: product.status as ProductStatus, // Type assertion to ensure proper status type
      description: getProductDescription(product.slug)
    });
    return acc;
  }, {});
  
  // Hard-coded descriptions for now - in a real app, these would come from markdown files
  function getProductDescription(slug: string): string {
    const descriptions: Record<string, string> = {
      'LinuxAI': 'A custom Linux distribution with native model protocols and networked-intelligence modules pre-installed.',
      'rolodexterVS': 'A customized fork of VS Code with rolodexter\'s networked-intelligence systems preconfigured.',
      'rolodexterGPT': 'Technical agent tools for developers, researchers, and strategists.',
      'rolodexterGIT': 'Intelligent version control agent with code history analysis.',
      'knowledge-workers': 'Research pipelines, citation graphing, open science compliance tools.',
      'creative-workers': 'Workflow augmentation for artists and content creators.',
      'executive-workers': 'Decision support tools and strategic analysis agents.'
    };
    
    return descriptions[slug] || 'Coming soon.';
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-6 text-black">Our Products</h1>
          <p className="text-xl text-gray-700 mb-8">
            I build tools and systems that extend human capabilities through networked intelligence. 
            Each product represents a different approach to integrating these capabilities 
            with your existing workflows and environments.
          </p>
        </div>
        
        {/* Display products by family */}
        {Object.entries(productsByFamily).map(([family, products]) => (
          <div key={family} className="max-w-6xl mx-auto mb-16" id={family.toLowerCase().replace(/ /g, '-')}>
            <h2 className="text-2xl font-bold mb-6 text-black border-b pb-2">{family}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sort products by priority within each family */}
              {[...products].sort((a, b) => a.priority - b.priority).map((product) => (
                <ProductCard 
                  key={product.slug}
                  title={product.title}
                  slug={product.slug}
                  category={product.category}
                  status={product.status}
                  path={product.path}
                  description={product.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add custom layout function for the products page to prevent duplicate footer
Products.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Products;
