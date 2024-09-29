import path from 'node:path'
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { defineConfig } from 'vite'

const fluentEditorRoot = path.resolve(__dirname, '../../fluent-editor')
export default defineConfig({
  plugins: [viteDemoPreviewPlugin()],
  resolve: {
    alias: [
      {
        find: /^@opentiny\/fluent-editor(\/(es|lib))?$/,
        replacement: path.resolve(fluentEditorRoot, 'src/index.ts'),
      },
      {
        find: /^@opentiny\/fluent-editor\/(theme)\/(.*)$/,
        replacement: `${path.resolve(fluentEditorRoot, 'src/assets')}/$1/$2`,
      },
    ],
  },
})
