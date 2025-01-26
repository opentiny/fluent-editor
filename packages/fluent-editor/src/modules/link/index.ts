import Quill from 'quill'
import LinkBlot from './formats/link'

const Module = Quill.import('core/module')

// @dynamic
class Link extends Module {
  static register() {
    Quill.register('blots/link', LinkBlot, true)
  }

  constructor(quill, options) {
    super(quill, options)
  }
}

export default Link
