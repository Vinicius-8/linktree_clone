/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  env: {
    SECRET_JWT:'H*hh4cTa8bNkLytzZ$Jk3&yGHDenYGD7f',
    SERVER: 'http://localhost:3000'
  }
}
