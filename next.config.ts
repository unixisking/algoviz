import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**/*': ['./src/bin/**/*'],
  },
}

module.exports = nextConfig
