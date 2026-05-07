import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [react()],
  site: 'https://innoblue.burneng.com',
  vite: {
    ssr: {
      external: ['node:async_hooks'],
    },
  },
});
