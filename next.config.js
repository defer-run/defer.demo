/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const cua = require("@cua.run/client").default;

if (process.env.CUA_TOKEN) {
  cua.init({ apiToken: process.env.CUA_TOKEN });
}

module.exports = nextConfig;
