import Quill from 'quill'
import { namespace } from '../config'
import { isElementInViewport, isFunction, isString } from '../utils/is'
import { HeaderWithID } from './header'

export interface HeaderListOptions {
  container: HTMLElement
  displayStyle: string
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

  private previousHeaders: { el: HTMLElement, text: string }[] = []
  root: HTMLElement
  options: HeaderListOptions
  isHidden: boolean = false
  observer: IntersectionObserver
  highlightedItem: HTMLElement
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

      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        root: this.quill.root,
        threshold: 0.25,
        rootMargin: '100% 0px -90% 0px',
      })
    }
    else {
      console.warn('header-list: options.container is required')
    }
  }

  resolveOptions(options: InputHeaderListOptions): HeaderListOptions {
    const container = isString(options.container) ? document.getElementById(options.container) : options.container
    return Object.assign({
      displayStyle: 'block',
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

  handleIntersection(entries: IntersectionObserverEntry[]) {
    const headers: IntersectionObserverEntry[] = []
    for (const entry of entries) {
      if (isElementInViewport(this.quill.root, entry.target as HTMLElement)) {
        headers.push(entry)
      }
    }
    console.log(headers)

    const entry = headers.reduce((entry, current) => {
      if (!entry || entry.boundingClientRect.y > current.boundingClientRect.y) {
        return current
      }
      return entry
    }, null)
    console.log(entry)
    if (!entry) return
    const header = entry.target as HTMLElement
    const headerId = header.id
    const listItem = this.root.querySelector(`[data-id="${headerId}"]`) as HTMLElement

    if (listItem) {
      if (this.highlightedItem) {
        this.highlightedItem.classList.remove('highlight')
      }
      listItem.classList.add('highlight')
      this.highlightedItem = listItem
    }
  }
}
