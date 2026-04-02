import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(isProd ? { output: 'export' } : {}),
  images: { unoptimized: true },
  ...(isProd ? {} : {
    redirects: async () => [
      {
        source: '/',
        destination: '/id',
        permanent: false,
      },
    ],
  }),
};

export default nextConfig;
