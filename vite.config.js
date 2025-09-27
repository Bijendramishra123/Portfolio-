// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',   // ✅ relative base (fix for GitHub Pages assets issue)
  plugins: [react()],
})
