/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLIENT_ID: "db7d70beb5d14841b699b7df68b56a1c",
    CLIENT_SECRET: "1316d41696ed444f88a9365c755eb8f2",
  },
  images: {
    domains: ["i.scdn.co"],
  },
};

module.exports = nextConfig;
