import type { ExpandedQuillOptions } from 'quill'
import type { IEditorConfig } from '../config/types'
import type I18N from '../modules/i18n'
import Quill from 'quill'
import { defaultLanguage, LANG_CONF } from '../config'

class FluentEditor extends Quill {
  isFullscreen: boolean = false
  options: IEditorConfig & ExpandedQuillOptions

  static register(...args: any[]): void {
    super.register(...args as Parameters<typeof Quill.register>)
  }

  get lang() {
    const i18nModule = this.getModule('i18n') as I18N
    return i18nModule ? i18nModule.options.lang : defaultLanguage
  }

  constructor(container: HTMLElement | string, options: IEditorConfig = {}) {
    super(container, options)
  }

  getLangText(name: string) {
    const i18nModule = this.getModule('i18n') as I18N
    if (!i18nModule) return LANG_CONF[defaultLanguage][name]
    return i18nModule.options.langText[name]
  }
}

export type {
  Module,
  Parchment as TypeParchment,
} from 'quill'

export default FluentEditor
