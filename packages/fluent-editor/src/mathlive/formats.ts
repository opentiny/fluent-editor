import { EmbedBlot } from 'parchment'
import type { Root } from 'parchment'
import type Quill from 'quill'
import { MathfieldElement } from 'mathlive'
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
    el.setValue(obj.value)
    return el
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
    const dom = this.domNode as HTMLElement
    this.quill = this.findQuillInstance()!
    if (this.mode === 'dialog') {
      dom.addEventListener('click', () => {
        // @ts-ignore
        this.quill!.getModule('mathlive').createDialog(dom.value)
      })
    }
  }

  html() {
    const { formula } = this.value()
    return `<math-field class="ql-math-field view"  contenteditable="false" mode="${this.mode}">${formula}</math-field>`
  }

  findQuillInstance(): Quill | null {
    let dom = this.domNode as HTMLElement
    for (let i = 0; i < 100; i++) {
      const p = dom.parentElement
      if (!p) return null
      // @ts-ignore
      if (p.quill) {
        // @ts-ignore
        return p.quill
      }
      dom = p
    }
    return null
  }
}
