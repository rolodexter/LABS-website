/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable image optimization in production to avoid localhost connection issues
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js',
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  // Override the default webpack configuration
  webpack: (config, { isServer }) => {
    // Handle image files directly using file-loader
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name]-[hash][ext]',
      },
    });

    return config;
  },

  // This helps ensure consistent builds between environments
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
