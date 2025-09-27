import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio-/',   // 👈 Must match your repo name (case + hyphen same)
  plugins: [react()],
})
