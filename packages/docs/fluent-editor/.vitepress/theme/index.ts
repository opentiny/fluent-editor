import type { Theme } from 'vitepress'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import DefaultTheme from 'vitepress/theme'
import { insertBaiduScript } from './insert-baidu-script'
import { inertDepsVersion } from './insert-deps-version'
import '@vitepress-code-preview/container/dist/style.css'
import './style.css'

export const define = <T>(value: T): T => value
export default define<Theme>({
  ...DefaultTheme,
  enhanceApp({ app }) {
    useComponents(app, DemoPreview)
    insertBaiduScript()
    inertDepsVersion()
  },
})
