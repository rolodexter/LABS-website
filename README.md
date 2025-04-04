# rolodexterLABS Website

Official website for rolodexterLABS, featuring a knowledge management system, agent ecosystem, and project showcase.

## Project Overview

The rolodexterLABS website is built with Next.js and follows a document-style UI design pattern with minimal, clean aesthetics. It features a comprehensive user account system with multiple authentication methods through Privy.

## Key Features

- **Authentication**: Multi-method authentication (wallet, email, Google, GitHub, Twitter) via Privy
- **Knowledge System**: MDX-based knowledge modules rendered directly within Next.js
- **Agent Ecosystem**: Showcase of specialized AI agents and their capabilities
- **Project Directory**: Catalog of rolodexterLABS projects and tools
- **Interactive Console**: Command-line interface for interacting with the ecosystem

## Documentation

All documentation is handled through the Next.js application using MDX files located in the `content/knowledge` directory. Documentation is accessible through the `/docs` and `/knowledge` routes.

> **Note**: This project previously included a Docusaurus instance that has been removed as it was not in use.

## Development

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start the development server: `npm run dev`

## Deployment

This project is configured for deployment on Railway with PostgreSQL integration. See the `docs/railway-deployment.md` file for detailed deployment instructions.