/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.regcheck.org.uk",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
