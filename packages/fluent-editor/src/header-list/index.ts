import Quill from 'quill'
import { namespace } from '../config'
import { isFunction, isString } from '../utils/is'
import { HeaderWithID } from './header'

export interface HeaderListOptions {
  container: HTMLElement
  hideClass: string
  onBeforeShow: () => boolean | Promise<boolean>
  onBeforeHide: () => boolean | Promise<boolean>
  onItemClick: (id: string) => void
}
export type InputHeaderListOptions = Partial<Pick<HeaderListOptions, 'container'>> & {
  container: HTMLElement | string
}
export class HeaderList {
  static moduleName = 'header-list'
  static toolName = 'header-list'
  static toolbarHandle = function () {
    const headerListModule = this.quill.getModule(HeaderList.moduleName) as HeaderList
    if (!headerListModule) return
    headerListModule.toggleDisplay()
  }

  static register() {
    Quill.register({
      'formats/header': HeaderWithID,
    }, true)
  }

  private previousHeaders: HTMLElement[] = []
  root: HTMLDivElement
  options: HeaderListOptions
  isHidden: boolean = false
  constructor(public quill: Quill, options: InputHeaderListOptions) {
    this.options = this.resolveOptions(options)
    if (this.options.container) {
      this.hideList()
      this.root = this.buildList()
      this.options.container.appendChild(this.root)

      this.quill.on(Quill.events.TEXT_CHANGE, () => {
        const currentHeaders = Array.from(this.quill.root.querySelectorAll<HTMLElement>(':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6'))

        const removedHeaders = this.previousHeaders.map(item => item.el).filter(previousHeader => !currentHeaders.includes(previousHeader))
        const newHeaders: { el: HTMLElement, index: number }[] = []
        const modifiedHeaders: HTMLElement[] = []
        for (const [index, header] of currentHeaders.entries()) {
          if (!this.previousHeaders.find(item => item.el === header)) {
            newHeaders.push({ el: header, index })
          }
          else if (this.previousHeaders.some(({ el, text }) => el === header && text !== header.textContent)) {
            modifiedHeaders.push(header)
          }
        }

        this.updateList(newHeaders, removedHeaders, modifiedHeaders)

        this.previousHeaders = currentHeaders.map(el => ({ el, text: el.textContent }))
      })
    }
    else {
      console.warn('header-list: options.container is required')
    }
  }

  resolveOptions(options: InputHeaderListOptions): HeaderListOptions {
    const container = isString(options.container) ? document.getElementById(options.container) : options.container
    return Object.assign({
      hideClass: `${namespace}-hidden`,
      onBeforeShow: () => false,
      onBeforeHide: () => false,
      onItemClick: () => { },
      container,
    }, options)
  }

  buildList() {
    const root = document.createElement('div')
    root.classList.add(`${namespace}-header-list`)
    return root
  }

  createListItem(id: string, text: string, level: number) {
    const item = document.createElement('div')
    item.classList.add(`${namespace}-header-list__item`, `level-${level}`)
    item.dataset.id = id
    item.textContent = text
    item.addEventListener('click', () => {
      const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      const selector = headerTags.map(tag => `:scope > ${tag}[id="${id}"]`).join(', ')
      const targetHeader = this.quill.root.querySelector(selector)
      if (targetHeader) {
        targetHeader.scrollIntoView()
      }
      if (isFunction(this.options.onItemClick)) {
        this.options.onItemClick(id)
      }
    })
    return item
  }

  async hideList() {
    if (await this.options.onBeforeHide()) return
    this.options.container.classList.add(this.options.hideClass)
    this.isHidden = true
  }

  async showList() {
    if (await this.options.onBeforeShow()) return
    this.options.container.classList.remove(this.options.hideClass)
    this.isHidden = false
  }

  toggleDisplay() {
    if (this.isHidden) {
      this.showList()
    }
    else {
      this.hideList()
    }
  }

  updateList(addHeaders: { el: HTMLElement, index: number }[], removeHeaders: HTMLElement[], modifiedHeaders: HTMLElement[]) {
    for (const header of removeHeaders) {
      const item = this.root.querySelector(`[data-id="${header.id}"]`)
      item.remove()
      this.observer.unobserve(header)
    }

    for (const { index, el } of addHeaders) {
      this.root.insertBefore(this.createListItem(el.id, el.textContent, Number(el.tagName.slice(1))), this.root.children[index])
      this.observer.observe(el)
    }

    for (const header of modifiedHeaders) {
      const listItem = this.root.querySelector(`[data-id="${header.id}"]`)
      if (listItem) {
        listItem.textContent = header.textContent
      }
    }
  }
}
