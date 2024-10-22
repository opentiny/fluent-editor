import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import * as glob from 'glob'
import { defineConfig } from 'vite'

interface Manifest {
  version: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}
export function getPackageManifest(pkgPath: string): Manifest {
  return JSON.parse(readFileSync(pkgPath, 'utf8')) as Manifest
}
export function rollupExternalFromPackage(pkgPath: string) {
  const { dependencies, peerDependencies } = getPackageManifest(pkgPath)
  const dependenciesKeys = Object.keys(dependencies ?? {})
  const peerDependenciesKeys = Object.keys(peerDependencies ?? {})

  return (id: string) => {
    const packages = new Set([...peerDependenciesKeys, ...dependenciesKeys])
    return Array.from(packages).some(pkg => id === pkg || id.startsWith(`${pkg}/`))
  }
}

function rollupOutput(target: string, format: string): any {
  return {
    format: target,
    entryFileNames: `[name].${target}.js`,
    preserveModules: true,
    dir: resolve(__dirname, 'dist', format),
    preserveModulesRoot: resolve(__dirname, 'src'),
    exports: 'named',
  }
}

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
  }
})
