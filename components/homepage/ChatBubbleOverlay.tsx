import React, { useRef, useEffect } from 'react';
import { format } from 'date-fns';

interface ChatBubbleOverlayProps {
  prompt: {
    id: string;
    title: string;
    from: string;
    to: string;
    content: string;
    timestamp: Date;
  };
  response?: {
    id: string;
    from: string;
    content: string;
    timestamp: Date;
  };
  position: {
    x: number;
    y: number;
  };
  isExpanded: boolean;
  onClose: () => void;
}

const ChatBubbleOverlay: React.FC<ChatBubbleOverlayProps> = ({
  prompt,
  response,
  position,
  isExpanded,
  onClose
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Close overlay when clicking outside (only when expanded)
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, onClose]);
  
  const formatTimestamp = (date: Date) => {
    return format(new Date(date), 'h:mm a • MMM d, yyyy');
  };
  
  // Determine overlay style based on position
  const overlayStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };
  
  return (
    <div 
      ref={overlayRef}
      className="fixed z-50 animate-fadeIn"
      style={overlayStyle}
    >
      <div className="relative w-96 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Prompt message */}
        <div className="animate-slideUp">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="font-mono text-sm font-medium">{prompt.from}</div>
              <div className="text-xs text-black">{formatTimestamp(prompt.timestamp)}</div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-mono text-sm bg-white text-black leading-relaxed">
                {prompt.content}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Response message */}
        {response && (
          <div className="border-t border-gray-100 animate-delayFadeIn">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="font-mono text-sm font-medium">{response.from}</div>
                <div className="text-xs text-black">{formatTimestamp(response.timestamp)}</div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm bg-white text-black leading-relaxed">
                  {response.content}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {/* Close button (only visible when expanded) */}
        {isExpanded && (
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1={18} y1={6} x2={6} y2={18}></line>
              <line x1={6} y1={6} x2={18} y2={18}></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBubbleOverlay;
