// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    port: 4322,
    // host: true, // décommentez pour exposer sur le réseau local (accessible depuis un autre appareil)
  },
});