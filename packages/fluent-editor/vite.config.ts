import { resolve } from 'path'
import { defineConfig } from 'vite'
import * as glob from 'glob'
import { readFileSync } from 'fs'

interface Manifest {
  version: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}
export const getPackageManifest = (pkgPath: string): Manifest => {
  return JSON.parse(readFileSync(pkgPath, 'utf8')) as Manifest
}
export const rollupExternalFromPackage = (pkgPath: string) => {
  const { dependencies, peerDependencies } = getPackageManifest(pkgPath)
  const dependenciesKeys = Object.keys(dependencies ?? {})
  const peerDependenciesKeys = Object.keys(peerDependencies ?? {})

  return (id: string) => {
    const packages = new Set([...peerDependenciesKeys, ...dependenciesKeys])
    return Array.from(packages).some(pkg => id === pkg || id.startsWith(`${pkg}/`))
  }
}

const rollupOutput = (target: string, format: string): any => ({
  format: target,
  entryFileNames: `[name].${target}.js`,
  preserveModules: true,
  dir: resolve(__dirname, 'dist', format),
  preserveModulesRoot: resolve(__dirname, 'src'),
  exports: 'named',
})

const input = glob.sync('./src/**/*.ts', {
  cwd: __dirname,
  absolute: true,
})

export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input,
      treeshake: false,
      preserveEntrySignatures: 'allow-extension',
      external: rollupExternalFromPackage(resolve(__dirname, 'package.json')),
      output: [
        rollupOutput('es', 'es'),
        rollupOutput('cjs', 'lib'),
      ],
    },
  },
  server: {
    host: 'localhost', // ip地址
    port: 8080, // 端口号
    open: true, // 启动后是否自动打开浏览器
  },
})
