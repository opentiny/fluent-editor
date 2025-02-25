import type { ThemeOptions } from 'quill/core/theme'
import type TypeToolbar from 'quill/modules/toolbar'
import type TypeIconPicker from 'quill/ui/icon-picker'
import type { TypeParchment } from '../core/fluent-editor'
import { CHANGE_LANGUAGE_EVENT, getListValue, inputFile, isNullOrUndefined } from '../config'
import FluentEditor from '../core/fluent-editor'
import { CustomImageSpec } from '../modules/custom-image/specs/CustomImageSpec'
import Tooltip from '../modules/link/modules/tooltip'
import { shortKey } from '../modules/shortcut-key'
import BetterTable from '../modules/table/better-table'
import { ColorPicker, Picker } from '../modules/toolbar/better-picker'
import { FormatPainter } from '../tools/format-painter'
import { fullscreenHandler } from '../tools/fullscreen'
import { Screenshot } from '../tools/screenshot'

const OriginSnowTheme = FluentEditor.import('themes/snow') as any
const IconPicker = FluentEditor.import('ui/icon-picker') as typeof TypeIconPicker

OriginSnowTheme.DEFAULTS = {
  modules: {
    'i18n': true,
    'keyboard': {
      bindings: {
        ...BetterTable.keyboardBindings,
        ...shortKey,
      },
    },
    'toolbar': {
      handlers: {
        ...(OriginSnowTheme.DEFAULTS as Record<string, any>).modules.toolbar.handlers,
        'formula': function () {
          if (!this.quill.isEnabled()) return
          const mathlive = this.quill.getModule('mathlive')
          if (!mathlive) {
            this.quill.theme.tooltip.edit('formula')
          }
          else {
            mathlive.createDialog()
          }
        },
        'undo': function () {
          this.quill.history.undo()
        },
        'redo': function () {
          this.quill.history.redo()
        },
        'file': function () {
          const accept = this.quill.options?.uploadOption?.fileAccept
          inputFile.call(this, 'file', accept)
        },
        'image': function () {
          const accept = this.quill.options?.uploadOption?.imageAccept
          inputFile.call(this, 'image', accept)
        },
        'emoji': function () {},
        'fullscreen': fullscreenHandler,
        'list': function (value) {
          const range = this.quill.getSelection()
          const formats = this.quill.getFormat(range)
          const preListValue = Array.isArray(formats.list) ? formats.list[0]?.value : formats.list?.value
          const curListValue = getListValue(value, preListValue)
          // 如果设置list的选区中有表格，判断第一个table-col位置，将表格前的内容设置为list格式
          const lines = this.quill.getLines(range.index, range.length)
          const tableCols = lines.filter(line => line.statics.blotName === 'table-col' && !line.prev)
          if (tableCols.length) {
            let start = range.index
            // 遍历table-col群组，以之获取表格，将表格前选区设置为对应list格式
            tableCols.forEach((item, index) => {
              const table = item.domNode.closest('table.quill-better-table')
              const tableBlot = FluentEditor.find(table) as TypeParchment.Blot
              const tableLength = tableBlot.length()
              const tableStart = this.quill.getIndex(item)
              const tableEnd = tableStart + tableLength
              const beforeTableRangeLength = tableStart - start
              // 在表格前设置列表
              this.quill.setSelection(start, beforeTableRangeLength, FluentEditor.sources.SILENT)
              this.quill.format('list', curListValue, FluentEditor.sources.USER)
              table.parentNode.classList.remove('quill-better-table-selected')
              // 当前表格末尾为下一个选取的开始
              start = tableEnd
              if (index === tableCols.length - 1) {
                // 将最后一个表格之后所有选区内容设置list格式
                this.quill.setSelection(tableEnd, range.index + range.length - tableEnd)
                this.quill.format('list', curListValue, FluentEditor.sources.USER)
              }
            })
          }
          else {
            this.quill.format('list', curListValue, FluentEditor.sources.USER)
          }
        },
        [FormatPainter.toolName]: FormatPainter,
        [Screenshot.toolName]: Screenshot,
        'line-height': function (value) {
          this.quill.format('line-height', value)
        },
        'divider': function () {
          const range = this.quill.getSelection(true)
          this.quill.insertText(range.index, '\n', FluentEditor.sources.USER)
          this.quill.insertEmbed(range.index + 1, 'divider', true, FluentEditor.sources.USER)
          this.quill.setSelection(range.index + 2, FluentEditor.sources.SILENT)
        },
      },
    },
    'better-table': true,
    'image': {
      specs: [CustomImageSpec],
      overlay: {
        style: {
          border: '1px dashed rgb(68, 68, 68)',
        },
      },
      align: {
        icons: {
          left: '<i class="icon-text-align-left"></i>',
          center: '<i class="icon-text-align-center"></i>',
          right: '<i class="icon-text-align-right"></i>',
        },
      },
    },
    'shortcut-key': true,
  },
}

const ALIGNS = [false, 'center', 'right']
const COLORS = [
  '',
  'rgb(255, 255, 255)',
  'rgb(0, 0, 0)',
  'rgb(72, 83, 104)',
  'rgb(41, 114, 244)',
  'rgb(0, 163, 245)',
  'rgb(49, 155, 98)',
  'rgb(222, 60, 54)',
  'rgb(248, 136, 37)',
  'rgb(245, 196, 0)',
  'rgb(153, 56, 215)',

  'rgb(242, 242, 242)',
  'rgb(127, 127, 127)',
  'rgb(243, 245, 247)',
  'rgb(229, 239, 255)',
  'rgb(229, 246, 255)',
  'rgb(234, 250, 241)',
  'rgb(254, 233, 232)',
  'rgb(254, 243, 235)',
  'rgb(254, 249, 227)',
  'rgb(253, 235, 255)',

  'rgb(216, 216, 216)',
  'rgb(89, 89, 89)',
  'rgb(197, 202, 211)',
  'rgb(199, 220, 255)',
  'rgb(199, 236, 255)',
  'rgb(195, 234, 213)',
  'rgb(255, 201, 199)',
  'rgb(255, 220, 196)',
  'rgb(255, 238, 173)',
  'rgb(242, 199, 255)',

  'rgb(191, 191, 191)',
  'rgb(63, 63, 63)',
  'rgb(128, 139, 158)',
  'rgb(153, 190, 255)',
  'rgb(153, 221, 255)',
  'rgb(152, 215, 182)',
  'rgb(255, 156, 153)',
  'rgb(255, 186, 132)',
  'rgb(255, 226, 112)',
  'rgb(213, 142, 255)',

  'rgb(165, 165, 165)',
  'rgb(38, 38, 38)',
  'rgb(53, 59, 69)',
  'rgb(20, 80, 184)',
  'rgb(18, 116, 165)',
  'rgb(39, 124, 79)',
  'rgb(158, 30, 26)',
  'rgb(184, 96, 20)',
  'rgb(163, 130, 0)',
  'rgb(94, 34, 129)',

  'rgb(147, 147, 147)',
  'rgb(13, 13, 13)',
  'rgb(36, 39, 46)',
  'rgb(12, 48, 110)',
  'rgb(10, 65, 92)',
  'rgb(24, 78, 50)',
  'rgb(88, 17, 14)',
  'rgb(92, 48, 10)',
  'rgb(102, 82, 0)',
  'rgb(59, 21, 81)',

  'custom',
]
const FONTS = [false, 'serif', 'monospace']
const HEADERS = ['1', '2', '3', false]
const SIZES = ['small', false, 'large', 'huge']
const LINEHEIGHT = [false, '1.2', '1.5', '2']

class SnowTheme extends OriginSnowTheme {
  constructor(public quill: FluentEditor, options: ThemeOptions) {
    super(quill, options)

    this.quill.emitter.on(CHANGE_LANGUAGE_EVENT, () => {
      this.i18nTextToolbar()
    })
  }

  i18nTextToolbar() {
    const toolbar = this.quill.getModule('toolbar') as TypeToolbar
    ColorPicker.clearText = this.quill.getLangText('clear-color')
    ColorPicker.customText = this.quill.getLangText('custom-color')
    if (!toolbar || !this.pickers) return
    this.pickers.forEach((picker) => {
      if (picker instanceof ColorPicker) {
        // EasyColorPicker have not dts. abd origin quill ColorPicker dts not complete. use any to resovle ts type error
        const colorPicker = picker as any
        colorPicker.options.remove()
        Array.from(colorPicker.select.options).forEach((option: any) => {
          if (option.hasAttribute('custom')) {
            option.remove()
          }
        })
        colorPicker.buildOptions()
        colorPicker.createUsedColor()
      }
    })
  }

  buildPickers(selects: NodeListOf<HTMLSelectElement>, icons: Record<string, string | Record<string, string>>) {
    this.pickers = Array.from(selects).map((select) => {
      if (select.classList.contains('ql-align')) {
        if (isNullOrUndefined(select.querySelector('option'))) {
          fillSelect(select, ALIGNS)
        }
        return new IconPicker(select, icons.align as Record<string, string>)
      }
      if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
        const format = select.classList.contains('ql-background') ? 'background' : 'color'
        if (isNullOrUndefined(select.querySelector('option'))) {
          fillColorSelect(select, COLORS, format, format === 'background' ? '#ffffff' : '#000000')
        }
        return new ColorPicker(select, icons[format] as string, {
          expandIcon: '<i class="icon" />',
          closeAfterChange: false,
        })
      }
      if (isNullOrUndefined(select.querySelector('option'))) {
        if (select.classList.contains('ql-font')) {
          fillSelect(select, FONTS)
        }
        else if (select.classList.contains('ql-header')) {
          fillSelect(select, HEADERS)
        }
        else if (select.classList.contains('ql-size')) {
          fillSelect(select, SIZES)
        }
        else if (select.classList.contains('ql-line-height')) {
          fillSelect(select, LINEHEIGHT)
        }
      }
      return new Picker(select)
    })
    const update = () => {
      this.pickers.forEach((picker) => {
        if (picker instanceof ColorPicker) return
        picker.update()
      })
    }
    this.quill.on(FluentEditor.events.EDITOR_CHANGE, update)
  }

  extendToolbar(toolbar) {
    const icons = FluentEditor.import('ui/icons') as Record<string, any>
    toolbar.container.classList.add('ql-snow')
    this.buildButtons(toolbar.container.querySelectorAll('button'), icons)
    this.buildPickers(toolbar.container.querySelectorAll('select'), icons)
    this.tooltip = new Tooltip(this.quill, this.options.bounds)
  }
}

function fillSelect(select, values, defaultValue = false) {
  values.forEach((value) => {
    const option = document.createElement('option')
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected')
    }
    else {
      option.setAttribute('value', value)
    }
    select.appendChild(option)
  })
}
function fillColorSelect(
  select: HTMLSelectElement,
  values: Array<string | boolean>,
  format: string,
  defaultValue: unknown = false,
) {
  const colorGetter = document.createElement('span') as HTMLElement
  for (const value of values) {
    const option = document.createElement('option')
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected')
    }
    else {
      if (value !== 'custom') {
        colorGetter.style[format] = String(value)
        option.setAttribute('value', colorGetter.style[format])
      }
      else {
        option.setAttribute('value', value)
      }
    }
    select.appendChild(option)
  }
}

export default SnowTheme
