/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add raw-loader for .glsl files
        config.module.rules.push({
          test: /\.glsl$/,
          use: 'raw-loader'
        });
    
        return config;
      },
      images: {
        domains: ['i.scdn.co'], // Add 'i.scdn.co' to the domains array
      }
};

export default nextConfig;
