/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    // ponytail: set NEXT_PUBLIC_API_URL in Vercel; localhost is the dev fallback
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  },
};
