/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, buildId, dev }) => {
    // 解决 pino-pretty 模块找不到的问题
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    }
    
    // 可选：也忽略 pino 的其他问题依赖
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'worker_threads': false,
      'pino-pretty': false,
    }
    
    return config
  },
}

module.exports = nextConfig
