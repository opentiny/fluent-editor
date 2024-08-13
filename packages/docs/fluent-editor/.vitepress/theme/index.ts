import Theme from 'vitepress/theme'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
import './vars.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    useComponents(app, DemoPreview)
  }
}
