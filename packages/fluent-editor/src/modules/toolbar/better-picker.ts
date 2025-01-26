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

  buildItem(option: HTMLOptionElement) {
    const item = super.buildItem(option)
    const value = option.getAttribute('value')
    item.style.setProperty('--value', value)
    return item
  }

  selectItem(item: HTMLElement | null, trigger = false) {
    const selected = this.container.querySelector('.ql-selected')
    if (item === selected || item == null) return
    // move ql-selected clear after judge.
    // ql-selected is the class for check mark in picker
    if (selected != null) {
      selected.classList.remove('ql-selected')
    }
    item.classList.add('ql-selected')
    this.select.selectedIndex = Array.from(item.parentNode.children).indexOf(item)
    if (item.hasAttribute('data-value')) {
      this.label.setAttribute('data-value', item.getAttribute('data-value'))
    }
    else {
      this.label.removeAttribute('data-value')
    }
    if (item.hasAttribute('data-label')) {
      this.label.setAttribute('data-label', item.getAttribute('data-label'))
    }
    else {
      this.label.removeAttribute('data-label')
    }
    if (trigger) {
      this.select.dispatchEvent(new Event('change'))
      this.close()
    }
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
