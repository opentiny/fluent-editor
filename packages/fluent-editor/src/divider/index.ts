import Quill from 'quill'

const BlockEmbed = Quill.import('blots/block/embed')

class DividerBlot extends BlockEmbed {
  static blotName = 'divider'
  static tagName = 'hr'

  static create() {
    const node = super.create()
    node.setAttribute('contenteditable', 'false')
    return node
  }
}

Quill.register(DividerBlot)
export default DividerBlot
