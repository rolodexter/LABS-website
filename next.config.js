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

  // Configure Emotion
  compiler: {
    emotion: true,
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

    // Ensure proper module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      os: false,
      assert: false,
      constants: false,
    };

    return config;
  },

  // This helps ensure consistent builds between environments
  poweredByHeader: false,
  generateEtags: false,

  // Add experimental features to help with module resolution
  experimental: {
    esmExternals: false,
    serverComponentsExternalPackages: ['express'],
  },

  // Enable proper output configuration for standalone server
  output: 'standalone',
};

module.exports = nextConfig;
