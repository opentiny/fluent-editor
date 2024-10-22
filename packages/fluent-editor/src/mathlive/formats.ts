import type { MathfieldElement } from 'mathlive'
import type { Root } from 'parchment'
import { EmbedBlot } from 'parchment'
import Quill from 'quill'

type MathliveBlotMode = 'dialog' | 'only-read'
export default class MathliveBlot extends EmbedBlot {
  static blotName = 'mathlive'
  static tagName = 'math-field'
  static className = 'ql-math-field'
  quill?: Quill
  initFlag = false
  mode: MathliveBlotMode
  constructor(scroll: Root, domNode: Node) {
    super(scroll, domNode)
    const dom = domNode as HTMLElement
    dom.setAttribute('contenteditable', 'false')
    this.mode = (dom.getAttribute('mode')
      || 'only-read') as MathliveBlotMode
  }

  static create(obj: { value: string, mode: MathliveBlotMode }) {
    const el = super.create() as MathfieldElement
    el.setAttribute('mode', obj.mode)
    el.classList.add('view')
    el.innerHTML = obj.value
    el.setValue(obj.value)
    return el as MathfieldElement
  }

  static value(domNode: MathfieldElement) {
    return {
      value: domNode.value,
      mode: domNode.getAttribute('mode'),
    }
  }

  value() {
    this.init()
    return super.value()
  }

  init() {
    if (this.initFlag) return
    if (this.mode === 'only-read') return
    this.initFlag = true
    const dom = this.domNode as MathfieldElement
    this.quill = this.findQuillInstance()
    if (this.mode === 'dialog') {
      dom.addEventListener('click', () => {
        // @ts-ignore
        this.quill.getModule('mathlive').createDialog(dom.value)
      })
    }
  }

  html() {
    const formula = (this.domNode as MathfieldElement).value
    return `<math-field class="ql-math-field view" contenteditable="false" mode="${this.mode}">${formula}</math-field>`
  }

  findQuillInstance(): Quill {
    if (this.quill) return this.quill
    let dom = (this.domNode as HTMLElement).parentElement
    while (dom) {
      const quill = (dom as any).quill
      if (quill instanceof Quill) {
        return quill
      }
      dom = dom.parentElement
    }
    throw new Error('not found quill instance')
  }
}
