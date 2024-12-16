import packageJson from '@opentiny/fluent-editor/package.json'

export function inertDepsVersion() {
  if (typeof document === 'undefined') return

  const {
    npm_package_devDependencies_vite: ViteVersion,
    npm_package_devDependencies_vitepress: VitePressVersion,
    npm_package_dependencies_vue: VueVersion,
    npm_package_dependencies_quill: QuillVersion,
  } = process.env
  const FluentEditorVersion = packageJson.version

  document.body.setAttribute('data-vite-version', ViteVersion)
  document.body.setAttribute('data-vitepress-version', VitePressVersion)
  document.body.setAttribute('data-vue-version', VueVersion)
  document.body.setAttribute('data-quill-version', QuillVersion)
  document.body.setAttribute('data-fluent-editor-version', FluentEditorVersion)
}
