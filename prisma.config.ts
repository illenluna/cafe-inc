import { defineConfig, env } from '@prisma/config';
import { loadEnvLocal } from './lib/load-env-local';

loadEnvLocal();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Migrate needs a direct (non-pooled) connection to Neon.
    url: env('DIRECT_URL'),
  },
});
