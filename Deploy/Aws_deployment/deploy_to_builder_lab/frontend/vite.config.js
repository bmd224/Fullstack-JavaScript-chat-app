import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get backend URL from the environment variable or use default for local run
const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: '0.0.0.0', // Allow connections from outside the container
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
      },
      '/socket.io': {
        target: backendUrl,
        changeOrigin: true,
        ws: true,
      },
    },
  },
})