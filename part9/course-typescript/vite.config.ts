import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'scaling-space-enigma-44wj5pw6wwxfj6jp-5173.app.github.dev'
    ]
  }
})
