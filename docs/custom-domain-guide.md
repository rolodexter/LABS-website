# Custom Domain & SSL Configuration Guide

This guide outlines the steps for configuring a custom domain and SSL certificate for the rolodexterLABS website on Railway.

## Prerequisites

- Access to the domain registrar for `rolodexterlabs.com`
- Admin access to the Railway project

## Steps to Configure Custom Domain

### 1. Set Up Domain in Railway

1. Log in to your Railway dashboard at https://railway.app
2. Navigate to your rolodexterLABS project
3. Click on the "Settings" tab
4. Scroll down to the "Domains" section
5. Click "Add Domain"
6. Enter `rolodexterlabs.com` as your domain name
7. Click "Add"

Railway will provide DNS records that need to be configured at your domain registrar.

### 2. Configure DNS Records

At your domain registrar, add the following DNS records:

#### Option 1: CNAME Record (Recommended)
- **Type:** CNAME
- **Host/Name:** `www` or `@` (depending on if you want `www.rolodexterlabs.com` or `rolodexterlabs.com`)
- **Value/Target:** The Railway-provided CNAME value (e.g., `cname.railway.app`)
- **TTL:** 3600 (or lower)

#### Option 2: A Records
- **Type:** A
- **Host/Name:** `@` (root domain)
- **Value:** Railway-provided IP addresses (typically multiple records)
- **TTL:** 3600 (or lower)

### 3. Verify Domain and Wait for Propagation

1. Back in the Railway dashboard, Railway will automatically check if the DNS records are correctly configured
2. DNS propagation can take up to 48 hours, but typically completes within a few hours
3. Once verified, Railway will display a "Verified" status next to your domain

## SSL Configuration

Railway automatically provisions and renews SSL certificates through Let's Encrypt once your domain is verified. No additional configuration is required.

### Verifying SSL Status

1. Log in to your Railway dashboard
2. Navigate to your rolodexterLABS project
3. Click on the "Settings" tab
4. Scroll down to the "Domains" section
5. Check for the "SSL" status next to your domain

You should see a green "Active" indicator once the SSL certificate is properly provisioned.

## Testing the Configuration

After the domain is verified and SSL is active, test your site by visiting:

- `https://rolodexterlabs.com`
- `https://www.rolodexterlabs.com` (if configured)

Verify that:
- The site loads without SSL warnings
- The URL shows as secure (look for the padlock icon in the browser)
- All assets load correctly without mixed content warnings

## Troubleshooting

### SSL Certificate Issues
- Ensure DNS records are correctly configured
- Check if there are any CAA records that might be restricting certificate issuance
- Wait at least 24 hours as certificate provisioning can take time

### Domain Not Verifying
- Double-check DNS records against Railway's provided values
- Ensure you've added the correct record type (A vs CNAME)
- Use a tool like [dnschecker.org](https://dnschecker.org) to verify DNS propagation

### Mixed Content Warnings
- Ensure all URLs in the application are using HTTPS
- Check for hardcoded HTTP URLs in the codebase

## Contact Support

If you continue to experience issues, contact Railway support at support@railway.app or open a support ticket from the Railway dashboard.