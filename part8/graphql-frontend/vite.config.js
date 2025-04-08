import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '5173-niezleziolk-fullstackop-onkb1acmxin.ws-eu118.gitpod.io'
    ]
  }
})
