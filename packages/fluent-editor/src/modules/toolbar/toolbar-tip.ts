import type { Constructor } from '../../config/types'
import type FluentEditor from '../../fluent-editor'
import { CHANGE_LANGUAGE_EVENT } from '../../config'

export function generateToolbarTip(QuillToolbarTip: Constructor) {
  return class extends QuillToolbarTip {
    constructor(public quill: FluentEditor, options: Partial<Record<string, any>>) {
      if (!options?.tipTextMap) {
        options.tipTextMap = {}
      }
      super(quill, options)

      this.quill.emitter.on(CHANGE_LANGUAGE_EVENT, () => {
        this.destroyAllTips()
        this.options = this.resolveOptions(options)
        this.createToolbarTip()
      })
    }

    resolveOptions(options: Partial<Record<string, any>>): Record<string, any> {
      const result = super.resolveOptions(options)
      if (!this.quill.lang) return result
      const shortKeyMap = {
        'bold': 'ctrl + B',
        'italic': 'ctrl + I',
        'underline': 'ctrl + U',
        'strike': 'ctrl + D',
        'clean': 'ctrl + /',
        'align-left': 'alt + L',
        'align-center': 'alt + C',
        'align-right': 'alt + R',
        'align-justify': 'alt + J',
        'indent-+1': 'ctrl + ]',
        'indent--1': 'ctrl + [',
        'script-sub': 'ctrl + ;',
        'script-super': 'ctrl + \'',
        'code': 'ctrl + E',
        'direction-rtl': 'ctrl + R',
        'direction-ltr': 'ctrl + L',
        'undo': 'ctrl + Z',
        'redo': 'ctrl + shift + Z',
        'color': 'ctrl + alt + C',
        'background': 'ctrl + alt + B',
        'link': 'ctrl + K',
      }
      const shortcutModule = this.quill.getModule('shortcut-key')
      const getShortKey = (name: string) => {
        if (!shortcutModule) return ''
        const shortKey = shortKeyMap[name]
        return shortKey ? `\n${shortKey}` : ''
      }
      const btnTips = [
        'color',
        'background',
        'bold',
        'italic',
        'strike',
        'underline',
        'undo',
        'redo',
        'clean',
        'link',
        'divider',
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
        'header-list',
      ].reduce((map, name) => {
        map[name] = this.quill.getLangText(name) + getShortKey(name)
        return map
      }, {} as Record<string, string>)
      const selectTips = [
        'font',
        'size',
        'lineheight',
      ].reduce((map, name) => {
        map[name] = {
          onShow: () => {
            return this.quill.getLangText(name) + getShortKey(name)
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
          onShow: (target: HTMLElement, value: string) => {
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
            return this.quill.getLangText(`${name}-${value}`) + getShortKey(`${name}-${value}`)
          },
        }
        return map
      }, {})
      const textMap = {
        ...btnTips,
        ...valueControlTips,
        ...selectTips,
        fullscreen: {
          onShow: () => {
            return this.quill.getLangText(this.quill.isFullscreen ? 'exit-fullscreen' : 'fullscreen')
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
}
