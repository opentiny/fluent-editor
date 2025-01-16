import type TypePicker from 'quill/ui/picker'
import { EasyColorPicker } from 'quill-easy-color'
import FluentEditor from '../../core/fluent-editor'

const OriginPicker = FluentEditor.import('ui/picker') as typeof TypePicker
export class Picker extends OriginPicker {
  buildLabel() {
    const label = document.createElement('span')
    label.classList.add('ql-picker-label')
    label.innerHTML = `<i class="icon" />`
    label.tabIndex = 0
    label.setAttribute('role', 'button')
    label.setAttribute('aria-expanded', 'false')
    this.container.appendChild(label)
    return label
  }
}

export class ColorPicker extends EasyColorPicker {
  static clearText: string
  static customText: string

  constructor(select: HTMLSelectElement, label: string, options: any) {
    super(select, label, options)
  }

  buildItem(option: HTMLOptionElement) {
    const item = super.buildItem(option)
    item.setAttribute('title', option.getAttribute('value'))
    return item
  }
}
