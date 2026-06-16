import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (sonarpilot.co) serves from the root, so base stays '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
