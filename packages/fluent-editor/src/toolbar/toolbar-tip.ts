import type { QuillToolbarTipOptions, TooltipItem } from 'quill-toolbar-tip'
import type { FluentEditor } from 'src/fluent-editor'
import QuillToolbarTip from 'quill-toolbar-tip'
import { ZH_CN } from '../config/i18n/zh-cn'

export class ToolbarTip extends QuillToolbarTip {
  constructor(public quill: FluentEditor, options: Partial<QuillToolbarTipOptions>) {
    // const reulst = this.resolveOptions(options)
    // const langText = this.quill.langText
    const langText = ZH_CN
    super(quill, resolveOptions(langText, options))
  }
}
function resolveOptions(langText: Record<string, string>, options: Partial<QuillToolbarTipOptions>): Omit<QuillToolbarTipOptions, 'defaultTooltipOptions'> {
  const resultOps = Object.assign({
    tipTextMap: {},
  }, options)
  const btnBlotTips = [
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
    'fullscreen',
    'better-table',
    'code-block',
    'formula',
    'format-painter',
  ].reduce((map, name) => {
    map[name] = langText[name]
    return map
  }, {})
  const selectTips = [
    'list',
    'script',
    'indent',
  ].reduce((map, name) => {
    map[name] = {
      onShow(_, value) {
        return langText[`${name}-${value}`]
      },
    }
    return map
  }, {})
  const simpleSelectTips = [
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

  resultOps.tipTextMap = {
    ...btnBlotTips,
    ...selectTips,
    ...simpleSelectTips,
    align: {
      onShow(target, value) {
        if (!value) value = 'left'
        return langText[`align-${value}`] || null
      },
    },
    direction: {
      onShow(target) {
        return langText[target.classList.contains('ql-active') ? 'direction-ltr' : 'direction-rtl']
      },
    },
    header: {
      onShow(_, value) {
        if (!value) value = 'normal'
        return langText[`header-${value}`]
      },
    },
  }
  return resultOps
}
