import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this project at /nulset-website/
const base = process.env.GITHUB_PAGES === 'true' ? '/nulset-website/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
