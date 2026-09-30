import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// `__dirname` does not exist in an ESM config, and `new URL().pathname` yields
// a broken `/E:/...` path on Windows — fileURLToPath is the portable form.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
