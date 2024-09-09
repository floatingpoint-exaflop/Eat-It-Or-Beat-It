import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend now running on 4000
        changeOrigin: true,
        secure: false,
      },
      '/api': 'http://localhost:4000'
    }
  }
})
