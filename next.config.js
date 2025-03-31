/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable image optimization in production to avoid localhost connection issues
  images: {
    unoptimized: true,
    disableStaticImages: true,
    domains: ['localhost', process.env.VERCEL_URL, process.env.RAILWAY_STATIC_URL].filter(Boolean),
  },

  // Disable static optimization on pages to ensure proper server-side rendering
  experimental: {
    outputFileTracingIgnores: ['node_modules'],
  },

  // Override the default webpack configuration
  webpack: (config, { isServer }) => {
    // Handle image files directly using file-loader
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
            name: '[name]-[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },

  // This helps ensure consistent builds between environments
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
