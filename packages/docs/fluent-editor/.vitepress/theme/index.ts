import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
import './style.css'
import { insertBaiduScript } from './insert-baidu-script'

export const define = <T>(value: T): T => value;
export default define<Theme>({
  ...DefaultTheme,
  enhanceApp({ app }) {
    useComponents(app, DemoPreview)
    insertBaiduScript()
  }
});
