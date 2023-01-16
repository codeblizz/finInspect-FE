/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    localUrl: process.env.LOCAL_URL,
    backendUrl: process.env.BASE_URL,
    secret: process.env.SECRET_KEY
  },
}

module.exports = nextConfig
