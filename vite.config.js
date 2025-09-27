import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Portfolio-/', // 👈 Must match your GitHub repo name exactly
  plugins: [react()],
});