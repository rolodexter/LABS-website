import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import ChatBubbleOverlay from './ChatBubbleOverlay';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    from: string;
    to: string;
    content: string;
    timestamp: Date;
    tags?: string[];
  };
  response?: {
    id: string;
    from: string;
    content: string;
    timestamp: Date;
  };
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, response }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  // Calculate position for the chat overlay
  useEffect(() => {
    if (cardRef.current && (isHovering || isExpanded)) {
      const rect = cardRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Position the overlay to right of the card on desktop, below on mobile
      const x = window.innerWidth > 768 
        ? rect.right + scrollX - 100 // Offset from right edge
        : rect.left + scrollX;
      
      const y = window.innerWidth > 768
        ? rect.top + scrollY
        : rect.bottom + scrollY + 10; // Add a small gap
      
      setOverlayPosition({ x, y });
    }
  }, [isHovering, isExpanded]);

  const formatTimestamp = (date: Date) => {
    return format(new Date(date), 'MMM d, yyyy • h:mm a');
  };

  const getPromptTitle = (prompt: any) => {
    return prompt.title || `Prompt from ${prompt.from} to ${prompt.to}`;
  };

  return (
    <div 
      ref={cardRef}
      className={`border-l-2 ${
        prompt.from === 'rolodexterGPT' ? 'border-black' : 'border-gray-400'
      } pl-4 py-1 transition-all duration-300 ${isExpanded ? 'bg-gray-50' : ''}`}
      onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
    >
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
            e.preventDefault();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {getPromptTitle(prompt)}
          </h3>
          <span className="text-xs font-mono text-black">
            {formatTimestamp(prompt.timestamp)}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-black mt-1 space-x-2">
          <span className="font-mono">{prompt.from}</span>
          <span>→</span>
          <span className="font-mono">{prompt.to}</span>
        </div>
        
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {prompt.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-block text-xs bg-gray-100 px-1.5 py-0.5 font-mono text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Chat overlay that appears on hover/click */}
      {(isHovering || isExpanded) && (
        <ChatBubbleOverlay 
          prompt={prompt}
          response={response}
          position={overlayPosition}
          isExpanded={isExpanded}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default PromptCard;
