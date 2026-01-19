/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hkddkxgelkhgseiskulz.supabase.co',
        pathname: '/storage/v1/object/public/**', 
      },
      {
        protocol: 'https',
        hostname: 'alhodaalnabawya.runasp.net',
        pathname: '/images/**',
      },
       {
        protocol: 'https',
        hostname: 'alhodaalnabawya.runasp.netimages',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;
