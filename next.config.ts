import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ['raw.githubusercontent.com', 'res.cloudinary.com', 'example.com', 'cdn.example.com'],
    },
};

export default nextConfig;
