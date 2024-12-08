import Quill from 'quill'
import { namespace } from '../config'
import { isFunction } from '../utils/is'
import { HeaderWithID } from './header'

export interface HeaderListOptions {
  container: HTMLElement
  displayStyle: string
  onItemClick: (id: string) => void
}
export type InputHeaderListOptions = Partial<Pick<HeaderListOptions, 'container'>> & Pick<HeaderListOptions, 'container'>
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

        const removedHeaders = this.previousHeaders.filter(previousHeader => !currentHeaders.includes(previousHeader))
        const newHeaders: HTMLElement[] = []
        const modifiedHeaders: HTMLElement[] = []
        for (const header of currentHeaders) {
          if (!this.previousHeaders.includes(header)) {
            newHeaders.push(header)
          }
          else if (this.previousHeaders.some(previousHeader => previousHeader === header && previousHeader.textContent !== header.textContent)) {
            modifiedHeaders.push(header)
          }
        }

        this.updateList(newHeaders, removedHeaders, modifiedHeaders)

        this.previousHeaders = currentHeaders
      })
    }
    else {
      console.warn('header-list: options.container is required')
    }
  }

  resolveOptions(options: InputHeaderListOptions): HeaderListOptions {
    return Object.assign({
      displayStyle: 'block',
      onItemClick: () => {},
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

  hideList() {
    this.options.container.style.display = 'none'
    this.isHidden = true
  }

  showList() {
    this.options.container.style.display = this.options.displayStyle
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

  updateList(addHeaders: HTMLElement[], removeHeaders: HTMLElement[], modifiedHeaders: HTMLElement[]) {
    for (const header of removeHeaders) {
      const item = this.root.querySelector(`[data-id="${header.id}"]`)
      item.remove()
    }

    for (const header of addHeaders) {
      this.root.appendChild(this.createListItem(header.id, header.textContent, Number(header.tagName.slice(1))))
    }

    for (const header of modifiedHeaders) {
      const listItem = this.root.querySelector(`[data-id="${header.id}"]`)
      if (listItem) {
        listItem.textContent = header.textContent
      }
    }
  }
}
