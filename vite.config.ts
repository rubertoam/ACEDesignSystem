import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** GitHub Pages project site: https://rubertoam.github.io/ACEDesignSystem/ */
const GITHUB_PAGES_BASE = '/ACEDesignSystem/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? GITHUB_PAGES_BASE : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        if (mode !== 'production') return
        const index = resolve(__dirname, 'dist/index.html')
        copyFileSync(index, resolve(__dirname, 'dist/404.html'))
      },
    },
  ],
}))
