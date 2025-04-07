import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import SimulatedChat from './SimulatedChat';
import usePromptStream from '../../lib/hooks/usePromptStream';
import ReactMarkdown from 'react-markdown';

// Type for modal state
interface ModalState {
  isOpen: boolean;
  promptContent?: string;
  promptTitle?: string;
  promptPath?: string;
}

const SystemDialogues: React.FC<{ prompts?: any[] }> = ({ prompts: providedPrompts }) => {
  // State for modal display
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
  });

  // Use our custom hook to fetch and process prompts if not provided via props
  const { messages: hookMessages, isLoading } = usePromptStream({
    // Only fetch if prompts weren't provided as props
    contentPath: providedPrompts ? '' : 'content/system/prompts',
    reverseOrder: true,
  });

  // Use either provided prompts or ones fetched by the hook
  const chatMessages = providedPrompts || hookMessages;

  // Handle clicking on a chat message to view the full content
  const handleMessageClick = (message: any) => {
    setModalState({
      isOpen: true,
      promptContent: message.fullContent || message.content,
      promptTitle: `${message.sender} - ${format(message.timestamp, 'yyyy-MM-dd HH:mm')}`,
      promptPath: message.path,
    });
  };

  // Close the modal
  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };

  return (
    <section className="my-8 md:my-12 max-w-full mx-auto">
      <div className="border-b border-gray-200 pb-2 mb-4 md:mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl md:text-2xl font-sans font-normal">Workstream</h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Real-time collaboration between rolodexterGPT and rolodexterVS
          </p>
        </div>
        <Link
          href="/system/dialogues"
          className="text-xs flex items-center px-2 py-1 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm bg-white"
        >
          <svg
            className="h-3 w-3 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          View Archive
        </Link>
      </div>

      <div className="mt-4 w-full">
        {isLoading ? (
          <div className="h-[350px] md:h-[400px] border border-gray-200 rounded-lg flex items-center justify-center p-4 bg-white">
            <p className="text-xs md:text-sm text-gray-500">Loading archived prompt exchanges...</p>
          </div>
        ) : chatMessages.length > 0 ? (
          <div className="relative overflow-hidden">
            <SimulatedChat
              messages={chatMessages}
              maxMessages={7} // Show exactly 7 messages as specified
              autoScroll={true}
              typingSpeed={40} // Slightly faster for better user experience
              loopMessages={true} // Enable looping as required
              reverseOrder={true} // Display newest messages first as required
              onClick={handleMessageClick} // Handle click to view full content
            />
          </div>
        ) : (
          <div className="h-[350px] md:h-[400px] border border-gray-200 rounded-lg flex items-center justify-center p-4 bg-white">
            <p className="text-xs md:text-sm text-gray-500">No prompt exchanges found.</p>
          </div>
        )}
      </div>

      {/* Mobile-optimized prompt modal for displaying full content */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-full md:max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] flex flex-col shadow-lg border border-gray-200">
            <div className="border-b border-gray-200 p-3 md:p-4 flex justify-between items-center bg-gray-50 rounded-t-lg">
              <h3 className="font-medium text-base md:text-lg truncate">
                {modalState.promptTitle}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-3 md:p-4 overflow-y-auto flex-grow">
              <div className="text-sm md:text-base prose prose-sm max-w-none">
                <ReactMarkdown>{modalState.promptContent || ''}</ReactMarkdown>
              </div>
            </div>
            {modalState.promptPath && (
              <div className="p-3 md:p-4 border-t border-gray-200 text-xs text-gray-500 bg-gray-50 rounded-b-lg">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Source: {modalState.promptPath.split('/').pop()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SystemDialogues;
