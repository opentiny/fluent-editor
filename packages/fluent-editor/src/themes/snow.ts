import type { Module, TypeParchment } from '../core/fluent-editor'
import { getListValue, inputFile } from '../config'
import FluentEditor from '../core/fluent-editor'
import { CustomImageSpec } from '../modules/custom-image/specs/CustomImageSpec'
import BetterTable from '../modules/table/better-table'
import { FormatPainter } from '../tools/format-painter'
import { fullscreenHandler } from '../tools/fullscreen'
import { Screenshot } from '../tools/screenshot'

const SnowTheme = FluentEditor.imports['themes/snow'] as typeof Module

SnowTheme.DEFAULTS = {
  modules: {
    'i18n': true,
    'keyboard': {
      bindings: {
        ...BetterTable.keyboardBindings,
      },
    },
    'toolbar': {
      handlers: {
        ...(SnowTheme.DEFAULTS as Record<string, any>).modules.toolbar.handlers,
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
        'better-table': function () {
          this.quill.getModule('better-table').insertTable(3, 3)
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
        'lineheight': function (value) {
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
    'better-table': {
      operationMenu: {
        color: true,
      },
    },
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
  },
}

export default SnowTheme
