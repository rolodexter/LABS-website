import React, { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

// Type definitions
interface ChatMessage {
  id: string;
  sender: string;
  content: string; // Plain text content for display
  fullContent?: string; // Original markdown content for expanded view
  timestamp: Date;
  tags?: string[];
  path?: string; // Path to the original .md file
}

interface SimulatedChatProps {
  messages: ChatMessage[];
  maxMessages?: number;
  autoScroll?: boolean;
  typingSpeed?: number; // Characters per second
  loopMessages?: boolean;
  reverseOrder?: boolean;
  onClick?: (message: ChatMessage) => void; // Callback for message clicks
}

const SimulatedChat: React.FC<SimulatedChatProps> = ({
  messages,
  maxMessages = 7,
  autoScroll = true,
  typingSpeed = 40,
  loopMessages = true,
  reverseOrder = true,
  onClick,
}) => {
  // State for visible messages and typing animation
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState<number>(-1);
  const [typedText, setTypedText] = useState<string>('');
  const [typingLineIndex, setTypingLineIndex] = useState<number>(0);

  // Refs for DOM manipulation and animation tracking
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track the message cycling for looping
  const [messageStartIndex, setMessageStartIndex] = useState(0);

  // State to track when we're about to restart the loop
  const [isRestarting, setIsRestarting] = useState<boolean>(false);

  // Process messages based on sort order preference
  const processedMessages = useCallback(() => {
    if (!messages || messages.length === 0) return [];

    // Create a copy to avoid mutating the original array
    const messagesCopy = [...messages];

    // Sort messages by timestamp (reverse chronological if specified)
    if (reverseOrder) {
      messagesCopy.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else {
      messagesCopy.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }

    return messagesCopy;
  }, [messages, reverseOrder]);

  // Initialize the chat with visible messages
  useEffect(() => {
    if (messages.length === 0) return;

    const sorted = processedMessages();

    // Get initial batch of messages to display (limited by maxMessages)
    const initialBatch = sorted.slice(messageStartIndex, messageStartIndex + maxMessages);
    setVisibleMessages(initialBatch);

    // Start typing animation with the first message
    setCurrentTypingIndex(0);
    setTypedText('');
    setTypingLineIndex(0);

    // Clean up any existing timers
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [messages, maxMessages, messageStartIndex, processedMessages]);

  // Handle typewriter animation for the current message
  useEffect(() => {
    if (
      visibleMessages.length === 0 ||
      currentTypingIndex < 0 ||
      currentTypingIndex >= visibleMessages.length
    ) {
      return;
    }

    const currentMessage = visibleMessages[currentTypingIndex];
    const fullText = currentMessage.content;

    // Split message content into lines for line-by-line typing animation
    const contentLines = fullText.split('\n');

    // If we're still on a valid line
    if (typingLineIndex < contentLines.length) {
      const currentLine = contentLines[typingLineIndex];
      const currentLineTyped = typedText.split('\n')[typingLineIndex] || '';

      // If we haven't finished typing the current line
      if (currentLineTyped.length < currentLine.length) {
        // Calculate delay based on typing speed (with slight variation for realism)
        const variableSpeed = typingSpeed * (0.9 + Math.random() * 0.2); // +/- 10% variation
        const delay = 1000 / variableSpeed;

        // Schedule next character animation
        typingTimerRef.current = setTimeout(() => {
          setTypedText(prev => {
            const lines = prev.split('\n');
            while (lines.length <= typingLineIndex) {
              lines.push('');
            }
            lines[typingLineIndex] = currentLine.substring(
              0,
              (lines[typingLineIndex] || '').length + 1
            );
            return lines.join('\n');
          });
        }, delay);
      } else {
        // Current line typing completed, move to next line after a brief pause
        typingTimerRef.current = setTimeout(() => {
          setTypingLineIndex(prev => prev + 1);
        }, 400); // Brief pause between lines
      }
    } else {
      // All lines in current message have been typed, move to next message after a pause
      typingTimerRef.current = setTimeout(() => {
        // If we have more messages to display in this batch
        if (currentTypingIndex < visibleMessages.length - 1) {
          // Move to the next message
          setCurrentTypingIndex(prev => prev + 1);
          setTypedText(''); // Reset typed text for the next message
          setTypingLineIndex(0); // Reset to first line
        } else if (loopMessages) {
          // We've reached the end of this batch
          const allMessages = processedMessages();

          // Set restarting flag to true - this will cause a pause before restarting
          setIsRestarting(true);

          // If we've shown all messages, start over from the beginning with a delay
          typingTimerRef.current = setTimeout(() => {
            if (messageStartIndex + maxMessages >= allMessages.length) {
              setMessageStartIndex(0);
            } else {
              // Otherwise, move to the next batch
              setMessageStartIndex(prev => prev + maxMessages);
            }
            setIsRestarting(false);
          }, 4000); // 4-second pause before restarting the loop
        }
      }, 1800); // Longer pause between messages
    }

    // Clean up the timer when component unmounts or dependencies change
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [
    visibleMessages,
    currentTypingIndex,
    typedText,
    typingSpeed,
    loopMessages,
    maxMessages,
    processedMessages,
    messageStartIndex,
    typingLineIndex,
  ]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typedText, currentTypingIndex, visibleMessages, autoScroll]);

  // Format timestamp for display
  const formatMessageTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  // Handle message click
  const handleMessageClick = (message: ChatMessage) => {
    if (onClick) {
      onClick(message);
    }
  };

  // Get agent initials for display
  const getAgentInitials = (sender: string) => {
    if (sender.includes('GPT')) return 'GPT';
    if (sender.includes('VS')) return 'VS';
    return sender.substring(0, 2).toUpperCase();
  };

  // Render the cursor for typing animation
  const renderTypingCursor = () => {
    // Using a black block character for the cursor that pulses
    return <span className="inline-block w-1.5 h-3.5 bg-black animate-pulse ml-0.5"></span>;
  };

  // Get current agent that is typing
  const getCurrentAgent = () => {
    if (currentTypingIndex >= 0 && currentTypingIndex < visibleMessages.length) {
      return visibleMessages[currentTypingIndex].sender.replace('rolodexter', '');
    }
    return null;
  };

  return (
    <div className="relative h-[300px] sm:h-[350px] md:h-[400px] border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Top fade gradient effect */}
      <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      {/* Agent typing indicator */}
      {!isRestarting && (
        <div className="absolute top-2 left-0 right-0 z-20 flex justify-center">
          <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white bg-opacity-90 rounded-full shadow-sm border border-gray-100 text-[10px] sm:text-xs text-gray-500 flex items-center">
            {getCurrentAgent() && (
              <>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                <span>{getCurrentAgent()} is responding...</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Messages container */}
      <div
        ref={chatContainerRef}
        className="h-full overflow-y-auto px-2 sm:px-3 py-3 sm:py-4 pb-10 sm:pb-12"
      >
        <div className="space-y-2 sm:space-y-2.5">
          {visibleMessages.map((message, index) => {
            // Determine if this message is currently being typed
            const isTyping = index === currentTypingIndex;
            // Display either the fully typed message or the partial typed text
            const displayContent = isTyping ? typedText : message.content;
            // Calculate opacity based on whether message is active
            const messageOpacity = isTyping ? '100' : '70';

            return (
              <div
                key={`${message.id}-${index}`}
                className={`flex w-full ${message.sender.includes('GPT') ? 'justify-start' : 'justify-end'} transition-opacity duration-300 opacity-${messageOpacity}`}
              >
                <div
                  className={`flex ${message.sender.includes('GPT') ? 'flex-row' : 'flex-row-reverse'} max-w-[90%] sm:max-w-[85%] md:max-w-[80%] items-start group`}
                  onClick={() => handleMessageClick(message)}
                >
                  {/* Avatar/initials */}
                  <div
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-[10px] sm:text-xs font-medium text-black ${message.sender.includes('GPT') ? 'mr-1.5 sm:mr-2' : 'ml-1.5 sm:ml-2'}`}
                  >
                    {getAgentInitials(message.sender)}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`
                      relative p-1.5 sm:p-2 rounded-lg cursor-pointer transition-all
                      ${
                        message.sender.includes('GPT')
                          ? 'bg-white border border-gray-200 text-black rounded-tl-none shadow-sm'
                          : 'bg-white border border-gray-200 text-black rounded-tr-none shadow-sm'
                      }
                      hover:bg-gray-50 hover:border-gray-300
                      group/bubble
                    `}
                  >
                    {/* Message header with sender and timestamp - Animate on hover */}
                    <div className="text-[8px] sm:text-[10px] text-gray-500 mb-0.5 flex justify-between opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300">
                      <span className="font-medium">
                        {message.sender.replace('rolodexter', '')}
                      </span>
                      <span className="ml-3 sm:ml-4">{formatMessageTime(message.timestamp)}</span>
                    </div>

                    {/* Message content with typing animation */}
                    <div className="whitespace-pre-wrap text-[11px] sm:text-xs md:text-sm font-light text-black">
                      {displayContent}
                      {isTyping && renderTypingCursor()}
                    </div>

                    {/* Tags if any */}
                    {message.tags && message.tags.length > 0 && (
                      <div className="mt-0.5 sm:mt-1 flex flex-wrap gap-0.5 sm:gap-1">
                        {message.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-[8px] sm:text-[10px] bg-gray-50 text-gray-600 px-1 py-0.5 rounded border border-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Touch-friendly click to view indicator */}
                    <div className="absolute bottom-0 right-0 p-1 opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-300">
                      <span className="text-[8px] sm:text-[10px] text-gray-400 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Restart loop indicator (appears when loop is restarting) */}
      {isRestarting && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20">
          <div className="text-[10px] sm:text-xs text-gray-500">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Loading more conversations...</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom fade gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default SimulatedChat;
