# Contributing to rolodexterLABS

Thank you for your interest in contributing to rolodexterLABS! This document provides guidelines and instructions for contributing to our project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## How to Contribute

### Reporting Bugs

If you find a bug in the website, please report it by creating an issue using the Bug Report template. Please include:

- A clear description of the bug
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots if applicable
- Environment details (browser, OS, device)

### Suggesting Features

Have an idea for a new feature? Please use the Feature Request template to suggest enhancements. Include:

- A clear description of the feature
- The problem it solves
- How you envision it working
- Any alternatives you've considered

### Requesting Content

To request new knowledge modules or documentation, use the Content Request template and provide:

- The type of content requested
- Topic description
- Target audience
- Key points to cover
- Related existing content

### Pull Requests

1. Fork the repository
2. Create a new branch for your changes (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes with descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
6. Push your branch to your fork
7. Submit a pull request to the main repository

## Development Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/rolodexter/LABS-website.git
   cd LABS-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required values

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser

### Database Setup

1. Ensure you have PostgreSQL installed and running
2. Update the `DATABASE_URL` in your `.env.local` file
3. Run Prisma migrations:
   ```bash
   npx prisma db push
   ```

## Code Style

We use ESLint and Prettier to maintain consistent code style. Before submitting a pull request:

1. Run the linter:
   ```bash
   npm run lint
   ```

2. Fix any linting issues:
   ```bash
   npm run lint:fix
   ```

## Testing

When adding new features or fixing bugs, please include appropriate tests:

1. Run the existing tests:
   ```bash
   npm test
   ```

2. Add new tests for your changes in the appropriate directory

## Documentation

If your changes affect user-facing functionality or require updates to documentation:

1. Update relevant documentation in the `/docs` directory
2. Add JSDoc comments to any new functions or components
3. Update the README if necessary

## Submitting Changes

1. Push your changes to your fork
2. Create a pull request against the `main` branch of the rolodexterLABS repository
3. Ensure the PR description clearly describes the problem and solution
4. Reference any related issues

## Getting Help

If you need help with contributing, please:

- Join our community Discord/Slack channel
- Reach out to maintainers directly
- Comment on the issue you're working on

Thank you for contributing to rolodexterLABS!