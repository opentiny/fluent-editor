import { defineConfig } from 'vite'
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'

export default defineConfig({
  plugins: [viteDemoPreviewPlugin()],
})
