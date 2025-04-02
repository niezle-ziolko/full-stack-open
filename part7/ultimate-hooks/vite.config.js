import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "5173-niezleziolk-fullstackop-75vdjot4u3u.ws-eu118.gitpod.io"
    ]
  }
})
