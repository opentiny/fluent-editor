import Tooltip from 'quill/ui/tooltip'
import type Quill from 'quill'
import { Delta } from 'quill/core'
import Emitter from 'quill/core/emitter'
import { MathfieldElement } from 'mathlive'
import type { Bounds } from 'quill/core/selection'
export default class MathliveTooltip extends Tooltip {
  static TEMPLATE = ``

  mathliveDom: MathfieldElement | null
  editValue?: string

  constructor(quill: Quill, boundsContainer?: HTMLElement) {
    super(quill, boundsContainer)
    this.mathliveDom = document.createElement('math-field') as MathfieldElement
    this.mathliveDom.classList.add('ql-math-field')
    this.root.appendChild(this.mathliveDom)
    this.root.classList.add('math-field-tooltip')
    this.listen()
  }

  listen() {
    this.mathliveDom.addEventListener('blur', (event) => {
      this.hide()
    })
    this.root.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault()
        this.save()
      }
      else if (event.key === 'Escape') {
        event.preventDefault()
        this.cancel()
      }
    })
  }

  cancel() {
    this.hide()
    this.restoreFocus()
  }

  edit(value?: string) {
    this.editValue = value
    this.root.classList.remove('ql-hidden')
    this.root.classList.add('ql-editing')
    this.mathliveDom.setValue(value || '')
    const bounds = this.quill.getBounds(this.quill.selection.savedRange)
    if (bounds != null) {
      this.position(bounds)
    }
    this.show()
    this.mathliveDom.focus()
  }

  restoreFocus() {
    this.mathliveDom!.blur()
    this.quill.focus({ preventScroll: true })
  }

  save() {
    const range = this.quill.getSelection(true)
    const inputValue = this.mathliveDom.value
    if (!inputValue) return
    const index = range ? range!.index : this.quill.getLength() - 1
    const delta = new Delta()
      .retain(index)
      .delete(this.editValue ? 1 : range?.length || 0)
      .insert({ mathlive: { value: inputValue, mode: 'dialog' } })
    this.quill.updateContents(delta, Emitter.sources.USER)
    this.quill.setSelection(index + 1, Emitter.sources.USER)
    this.hide()
  }

  position(reference: Bounds) {
    const adjustedReference = { ...reference }
    adjustedReference.left = reference.left + this.root.offsetWidth / 2 - reference.width / 2
    return super.position(adjustedReference)
  }
}
