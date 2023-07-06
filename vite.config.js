import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5714,
  },
  build: {
    outDir: '../todo-backend/public',
    emptyOutDir: true
  }
})
