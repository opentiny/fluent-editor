import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    sourcemap: false,
    minify: false,
    rollupOptions: {
      input: 'src/assets/style.scss',
      treeshake: false,
      preserveEntrySignatures: 'strict',
      output: {
        dir: resolve(__dirname, 'dist/theme'),
        assetFileNames: 'style.css',
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'src/assets'),
      },
    },
  },
})
