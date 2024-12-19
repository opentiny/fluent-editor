import type { Theme } from 'vitepress'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import DefaultTheme from 'vitepress/theme'
import Toast, { POSITION } from 'vue-toastification'
import { insertBaiduScript } from './insert-baidu-script'
import { inertDepsVersion } from './insert-deps-version'
import '@vitepress-code-preview/container/dist/style.css'
import './style.css'
import 'vue-toastification/dist/index.css'

export const define = <T>(value: T): T => value
export default define<Theme>({
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Toast, {
      position: POSITION.TOP_CENTER,
      timeout: 3000,
      hideProgressBar: true,
    })
    useComponents(app, DemoPreview)
    insertBaiduScript()
    inertDepsVersion()
  },
})
