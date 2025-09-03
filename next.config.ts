import type { NextConfig } from "next";
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@remoola/ui'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  allowedDevOrigins: ['localhost', '127.0.0.1'],
};

export default nextConfig;
