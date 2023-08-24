/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
      cssProp: true,
    },
  },
  env: {
    apiStaging: 'https://aacsl-prod-web-app.azurewebsites.net/v1',
    apiLocal: 'http://127.0.0.1:3000/v1',
    environment: 'production',
  },
};

module.exports = nextConfig;
