import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Allow images from Supabase Storage (product photos, avatars, community)
        protocol: "https",
        hostname: "qucqfgxlvooalrxjtlhd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Allow placehold.co placeholder images used in seed data
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
