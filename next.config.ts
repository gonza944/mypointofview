import type { NextConfig } from "next";
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gonzaloariza-975314016.imgix.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;
