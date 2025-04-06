import Link from 'next/link';
import Badge from './Badge';

// Map status values to those expected by Badge component
const mapStatus = (status: string): "available" | "development" | "planned" | undefined => {
  switch (status) {
    case "Stable":
      return "available";
    case "In Development":
      return "development";
    case "Planned":
      return "planned";
    default:
      return undefined;
  }
};

type ProductCardProps = {
  title: string;
  slug: string;
  category: string;
  status: 'Stable' | 'In Development' | 'Planned';
  path: string;
  description?: string;
};

const ProductCard = ({ 
  title, 
  slug, 
  category, 
  status, 
  path, 
  description 
}: ProductCardProps) => {
  const isStable = status === 'Stable';
  
  return (
    <div className="border border-gray-200 p-6 rounded-md hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Badge status={mapStatus(status)} size="sm">{status}</Badge>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">{category}</div>
      
      {description && (
        <p className="mb-6 text-gray-700">{description}</p>
      )}
      
      <div className="flex justify-between items-center">
        {isStable ? (
          <Link 
            href={path} 
            className="inline-flex items-center border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Learn More
          </Link>
        ) : (
          <div className="relative inline-block">
            <button 
              disabled 
              className="inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
            >
              Learn More
            </button>
            <div className="absolute bottom-full mb-2 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Coming soon
            </div>
          </div>
        )}
        
        <span className="text-sm text-gray-500">{slug}</span>
      </div>
    </div>
  );
};

export default ProductCard;
