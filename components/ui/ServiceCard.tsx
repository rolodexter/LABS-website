import Link from 'next/link';
import Badge from './Badge';

type ServiceCardProps = {
  title: string;
  slug: string;
  category: string;
  status: 'available' | 'development' | 'planned';
  path: string;
  linkedAgent?: string | null;
  description?: string;
  badge?: string | null;
};

const ServiceCard = ({ 
  title, 
  slug, 
  category, 
  status, 
  path, 
  linkedAgent,
  description,
  badge 
}: ServiceCardProps) => {
  const isAvailable = status === 'available';
  const isInDevelopment = status === 'development';
  const isPlanned = status === 'planned';
  
  return (
    <div className={`border ${isAvailable ? 'border-gray-200' : 'border-gray-100'} p-6 rounded-md hover:shadow-sm transition duration-200 ${!isAvailable ? 'bg-gray-50' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-semibold ${!isAvailable ? 'text-gray-600' : 'text-black'}`}>
          {title}
          {badge && <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">{badge}</span>}
        </h3>
        <Badge status={status} size="sm">{isInDevelopment ? 'In Development' : (isPlanned ? 'Planned' : 'Available')}</Badge>
      </div>
      
      <div className="text-sm text-gray-500 mb-5">
        {category}
        {linkedAgent && (
          <span className="ml-2 inline-flex items-center">• <span className="font-mono ml-1">{linkedAgent}</span></span>
        )}
      </div>
      
      {description && (
        <p className="mb-8 text-gray-700 leading-relaxed">{description}</p>
      )}
      
      <div className="flex justify-between items-center">
        {isAvailable ? (
          <Link 
            href={path} 
            className="inline-flex items-center border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Learn More
          </Link>
        ) : (
          <div className="relative inline-block group">
            <button 
              disabled 
              className="inline-flex items-center border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
            >
              {isInDevelopment ? 'In Development' : 'Coming Soon'}
            </button>
            <div className="absolute bottom-full mb-2 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isInDevelopment ? 'This service is currently in development' : 'This service is planned for future release'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
