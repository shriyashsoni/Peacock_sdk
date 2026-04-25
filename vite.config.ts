import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['crypto', 'buffer', 'stream', 'util'],
      globals: { Buffer: true, process: true },
    }),
  ],
  server: { port: 3000, strictPort: true },
  css: {
    postcss: {}
  }
});
