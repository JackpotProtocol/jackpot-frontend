/** @type {import('next').NextConfig} */
const nextConfig = {
  // 添加这行配置来解决问题
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'pino-pretty': false,
    }
    return config
  },
}

module.exports = nextConfig
