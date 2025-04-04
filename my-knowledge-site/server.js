const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Knowledge base
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

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

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

    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      reply: 'Sorry, I encountered an error while processing your request. Please try again later.'
    });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
