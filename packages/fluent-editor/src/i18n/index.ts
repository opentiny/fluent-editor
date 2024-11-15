import type { FluentEditor } from '../fluent-editor'
import { LANG_CONF } from '../config'

export interface I18NOptions {
  lang: keyof typeof LANG_CONF
  text: Record<string, string>
}
export class I18N {
  options: I18NOptions
  constructor(public quill: FluentEditor, options: Partial<I18NOptions>) {
    this.options = this.resolveOptions(options)
    if (!(this.options.lang in LANG_CONF)) {
      console.warn(`The language ${this.options.lang} is not supported. Use the default language: en-US`)
      this.options.lang = 'en-US'
    }
    this.quill.lang = this.options.lang
    this.quill.langText = Object.assign({}, LANG_CONF[this.options.lang], this.options.text)
  }

  resolveOptions(options: Partial<I18NOptions>) {
    return Object.assign({
      lang: 'en-US',
      text: {},
    }, options)
  }
}
