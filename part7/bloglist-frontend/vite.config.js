import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      '5173-niezleziolk-fullstackop-75vdjot4u3u.ws-eu118.gitpod.io'
    ]
  },
});
