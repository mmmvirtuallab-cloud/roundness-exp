import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This base URL is needed for GitHub Pages deployment
  // It matches the repo name from your homepage URL
  base: '/roundness-exp/', 
  server: {
    open: true, // Opens browser automatically when running npm run dev
  },
  build: {
    outDir: 'dist', // Ensures output goes to 'dist' folder
  }
})