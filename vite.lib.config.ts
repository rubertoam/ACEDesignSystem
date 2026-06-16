import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const externals = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-slider',
  '@radix-ui/react-switch',
  'clsx',
  'lucide-react',
  'tailwind-merge',
]

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/index.ts', 'src/components/**/*', 'src/lib/**/*'],
      exclude: ['src/pages/**/*', 'src/App.tsx', 'src/main.tsx', 'src/layouts/**/*'],
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'ace-design-system',
    },
    rollupOptions: {
      external: externals,
    },
  },
})
