import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/tiny-editor/projects/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    outDir: '../docs/fluent-editor/.vitepress/dist/projects',
  },
})
