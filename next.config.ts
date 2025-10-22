/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Allow production builds even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Allow production builds even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
