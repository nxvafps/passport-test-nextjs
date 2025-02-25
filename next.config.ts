import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
