/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:8000",
  },
  ...nextConfig,
};
