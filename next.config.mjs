/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "intellhire.runasp.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/intelliHire/login",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/intelliHire/register",
        destination: "/account-type",
        permanent: true,
      },
      {
        source: "/intelliHire/signup",
        destination: "/account-type",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/account-type",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/account-type",
        permanent: true,
      },
      {
        source: "/forgot-password",
        destination: "/forget-password",
        permanent: true,
      },
      {
        source: "/intelliHire/forgot-password",
        destination: "/forget-password",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
