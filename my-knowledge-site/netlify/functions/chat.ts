import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Knowledge base for context
const knowledgeBase = {
  'ecosystem': {
    'roles': {
      'Joe Maristela': 'Human Executor focusing on operations and execution',
      'rolodexterGPT': 'Knowledge Strategist',
      'rolodexterVS': 'IDE Agent',
      'rolodexterGIT': 'DevOps Intelligence',
      'rolodexterAPI': 'Connectivity Layer',
      'rolodexterINT': 'Windows Desktop Agent'
    }
  }
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Function to generate response using Gemini
async function generateResponse(messages: Message[]): Promise<string> {
  try {
    // Convert the knowledge base to a string for context
    const context = `About the rolodexter ecosystem:\n` +
      Object.entries(knowledgeBase.ecosystem.roles)
        .map(([name, role]) => `${name}: ${role}`)
        .join('\n');

    // Create chat history for context
    const chatHistory = messages.slice(0, -1)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Get the user's question
    const userQuestion = messages[messages.length - 1].content;

    // Create the prompt
    const prompt = `You are an AI assistant for the rolodexter documentation. Use the following context to answer questions about the ecosystem.\n\nContext:\n${context}\n\nChat History:\n${chatHistory}\n\nUser Question: ${userQuestion}\n\nProvide a helpful, concise response based on the context provided. If the question cannot be answered using the given context, say so politely.`;

    // Generate response using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I encountered an error while processing your request. Please try again later.';
  }
}

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { messages } = JSON.parse(event.body || '{}');

    if (!Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    // Generate a response based on the conversation
    const reply = await generateResponse(messages);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
