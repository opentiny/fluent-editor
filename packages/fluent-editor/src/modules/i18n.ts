import type FluentEditor from '../fluent-editor'
import { CHANGE_LANGUAGE_EVENT, defaultLanguage, LANG_CONF } from '../config'
import { isUndefined } from '../utils/is'

interface I18NOptions {
  lang: string
  langText: Record<string, string>
}

class I18N {
  isFullscreen: boolean = false
  options: I18NOptions = {
    lang: 'en-US',
    langText: LANG_CONF['en-US'],
  }

  constructor(public quill: FluentEditor, options: Partial<I18NOptions>) {
    this.options = Object.assign({}, options, this.resolveLanguageOption(options || {}))
    this.changeLanguage(this.options)
  }

  resolveLanguageOption(options: Partial<I18NOptions>): I18NOptions {
    if (isUndefined(options.lang)) {
      options.lang = defaultLanguage
    }
    if (!(options.lang in LANG_CONF)) {
      console.warn(`The language ${options.lang} is not supported. Use the default language: ${defaultLanguage}`)
      options.lang = defaultLanguage
    }
    return {
      lang: options.lang,
      langText: Object.assign({}, LANG_CONF[options.lang], options.langText || {}),
    }
  }

  changeLanguage(options: Partial<I18NOptions>) {
    const langOps = this.resolveLanguageOption(options)
    if (langOps.lang === this.quill.lang) return
    this.options.lang = langOps.lang
    this.options.langText = langOps.langText
    this.quill.emitter.emit(CHANGE_LANGUAGE_EVENT, this.options.lang, this.options.langText)
  }
}

export { I18NOptions }

export default I18N
