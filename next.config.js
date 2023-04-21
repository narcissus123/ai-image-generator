/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "myaiimagegenerator15a281.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;
