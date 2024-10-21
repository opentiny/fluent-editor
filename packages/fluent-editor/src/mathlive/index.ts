import type Quill from 'quill'
import { Module } from 'quill'
import MathliveTooltip from './tooltip'
import 'mathlive'
import 'mathlive/static.css'
import 'mathlive/fonts.css'

export default class MathliveModule extends Module<boolean> {
  tooltip: MathliveTooltip
  constructor(quill: Quill, options?: boolean) {
    super(quill, options)
    // @ts-ignore
    quill.root.quill = quill
    this.tooltip = new MathliveTooltip(quill)
  }

  async createDialog(value?: string) {
    this.tooltip.edit(value)
  }
}
