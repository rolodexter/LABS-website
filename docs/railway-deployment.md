# Railway Deployment Guide

This document outlines the necessary configuration for deploying the rolodexterLABS website on Railway.

## Required Environment Variables

Configure the following environment variables in your Railway project:

### Database Connection
- `DATABASE_URL`: PostgreSQL connection string provided by Railway's PostgreSQL plugin
  Example format: `postgresql://username:password@hostname:port/database`

### Authentication (Privy)
- `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy application ID (public)
- `PRIVY_APP_SECRET`: Your Privy application secret (private)

### Next.js Configuration
- `NODE_ENV`: Set to `production` for production deployments
- `PORT`: The port your application will run on (typically `3000`)
- `NEXT_PUBLIC_BASE_URL`: The base URL of your deployed application (e.g., `https://rolodexterlabs.com`)

## Service Dependencies

1. **PostgreSQL Database**
   - Add the PostgreSQL plugin in your Railway project
   - Railway will automatically inject the `DATABASE_URL` environment variable

2. **Custom Domain Setup** (optional)
   - Configure your custom domain in Railway's project settings
   - Update DNS records with your domain registrar as instructed by Railway

## Deployment Process

1. Push your code to the connected repository
2. Railway will automatically detect changes and deploy using the Dockerfile
3. The health check endpoint at `/health` will verify successful deployment

## Database Migrations

Before first deployment, ensure your database schema is properly initialized:

```bash
# Run this command in Railway's shell interface
npx prisma db push
```

This will create the User table and any other required schema objects in the PostgreSQL database.

## Troubleshooting

- **Database Connection Issues**: Verify the `DATABASE_URL` variable is correctly set and accessible
- **Authentication Failures**: Check that Privy credentials are correctly configured
- **Build Failures**: Examine build logs for potential errors in dependencies or configuration

For any persistent issues, contact the rolodexterLABS development team.