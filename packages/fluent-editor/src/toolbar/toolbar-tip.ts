import type { QuillToolbarTipOptions, TooltipItem } from 'quill-toolbar-tip'
import type { FluentEditor } from 'src/fluent-editor'
import QuillToolbarTip from 'quill-toolbar-tip'
import { ZH_CN } from '../config/i18n/zh-cn'

export class ToolbarTip extends QuillToolbarTip {
  static moduleName: string = 'toolbar-tip'
  constructor(public quill: FluentEditor, options: Partial<QuillToolbarTipOptions>) {
    if (!options?.tipTextMap) {
      options.tipTextMap = {}
    }
    super(quill, options)
  }

  resolveOptions(options: Partial<QuillToolbarTipOptions>): QuillToolbarTipOptions {
    const result = super.resolveOptions(options)
    // const langText = this.quill.langText
    const langText = ZH_CN
    const btnTips = [
      'bold',
      'italic',
      'strike',
      'underline',
      'undo',
      'redo',
      'clean',
      'link',
      'blockquote',
      'code',
      'image',
      'file',
      'emoji',
      'video',
      'screenshot',
      'better-table',
      'code-block',
      'formula',
      'format-painter',
    ].reduce((map, name) => {
      map[name] = langText[name]
      return map
    }, {} as Record<string, string>)
    const selectTips = [
      'color',
      'background',
      'font',
      'size',
    ].reduce((map, name) => {
      map[name] = {
        onShow() {
          return langText[name]
        },
      }
      return map
    }, {})
    const valueControlTips = [
      'list',
      'align',
      'script',
      'indent',
      'header',
      'direction',
    ].reduce((map, name) => {
      map[name] = {
        onShow(target: HTMLElement, value: string) {
          if (name === 'direction') {
            value = target.classList.contains('ql-active') ? 'rtl' : 'ltr'
          }
          if (!value) {
            if (name === 'align') {
              value = 'left'
            }
            else if (name === 'header') {
              value = 'normal'
            }
          }
          return langText[`${name}-${value}`]
        },
      }
      return map
    }, {})
    const textMap: QuillToolbarTipOptions['tipTextMap'] = {
      ...btnTips,
      ...valueControlTips,
      ...selectTips,
      fullscreen: {
        onShow: () => {
          return langText[this.quill.isFullscreen ? 'exit-fullscreen' : 'fullscreen']
        },
      },
    }
    return {
      ...result,
      tipTextMap: {
        ...textMap,
        ...options.tipTextMap,
      },
    }
  }
}
