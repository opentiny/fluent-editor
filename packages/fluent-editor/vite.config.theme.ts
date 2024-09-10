import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    sourcemap: false,
    minify: false,
    rollupOptions: {
      input: 'src/assets/index.scss',
      treeshake: false,
      preserveEntrySignatures: 'strict',
      output: {
        dir: resolve(__dirname, 'dist/theme'),
        assetFileNames: 'index.css',
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'src/assets'),
      },
    },
  },
})
