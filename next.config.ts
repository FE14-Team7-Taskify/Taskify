import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `
      @use "@/styles/colors" as *;
      @use "@/styles/typography" as *;
      @use "@/styles/breakpoints" as *;
    `,
  },
};

export default nextConfig;
