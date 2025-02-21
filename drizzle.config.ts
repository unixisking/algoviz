import type { Config } from 'drizzle-kit'
import { env } from '@/lib/env.mjs'

export default {
  schema: './src/lib/db/schema',
  dialect: 'postgresql',
  out: './src/lib/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
    ssl: {
      cert: env.DATABASE_CERT,
    },
  },
} satisfies Config
