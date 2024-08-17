import Theme from 'vitepress/theme'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
import './style.css'
import { insertBaiduScript } from './insert-baidu-script'

export default {
  ...Theme,
  enhanceApp({ app }) {
    useComponents(app, DemoPreview)
    insertBaiduScript()
  }
}
