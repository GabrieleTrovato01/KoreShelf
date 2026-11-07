import { defineConfig } from 'vite';

// In sviluppo (npm run dev) le chiamate /api, /covers e /ebooks vengono
// girate al backend Rust (cargo run) che ascolta sulla porta 3000.
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
      '/covers': 'http://127.0.0.1:3000',
      '/ebooks': 'http://127.0.0.1:3000',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
  },
});
