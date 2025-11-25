import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom', // ✅ use Vitest's built-in DOM environment
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
