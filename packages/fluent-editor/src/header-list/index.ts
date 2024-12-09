import type TypeToolbar from 'quill/modules/toolbar'
import Quill from 'quill'
import { namespace } from '../config'
import { isElementInViewport, isFunction, isString } from '../utils/is'
import { HeaderWithID } from './header'

export interface HeaderListOptions {
  container: HTMLElement
  scrollContainer: HTMLElement | undefined
  hideClass: string
  topOffset: number | (() => number | Promise<number>)
  onBeforeShow: () => boolean | Promise<boolean>
  onBeforeHide: () => boolean | Promise<boolean>
  onItemClick: (id: string) => void
}
export type InputHeaderListOptions = Partial<Omit<HeaderListOptions, 'container' | 'scrollContainer'>> & {
  container: HTMLElement | string
  scrollContainer: HTMLElement | string
}
export class HeaderList {
  static moduleName = 'header-list'
  static toolName = 'header-list'
  static toolbarHandle = async function () {
    const headerListModule = this.quill.getModule(HeaderList.moduleName) as HeaderList
    if (!headerListModule) return
    headerListModule.toggleDisplay()
  }

  static register() {
    Quill.register({
      'formats/header': HeaderWithID,
    }, true)
  }

  previousHeaders: { el: HTMLElement, text: string }[] = []
  isHidden: boolean = false
  root: HTMLElement
  options: HeaderListOptions
  observer: IntersectionObserver
  highlightedItem: Element
  constructor(public quill: Quill, options: InputHeaderListOptions) {
    this.options = this.resolveOptions({ ...options })
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
        root: this.options.scrollContainer,
        rootMargin: `0px 0px -90% 0px`,
      })

      this.quill.on(Quill.events.EDITOR_CHANGE, () => {
        const [range] = this.quill.selection.getRange()
        if (range === null) {
          this.activeToolbarControl()
        }
      })
    }
    else {
      console.warn('header-list: options.container is required')
    }
  }

  resolveOptions(options: InputHeaderListOptions): HeaderListOptions {
    const container = isString(options.container) ? document.getElementById(options.container) : options.container
    let scrollContainer = options.scrollContainer ? isString(options.scrollContainer) ? document.getElementById(options.scrollContainer) : options.scrollContainer : this.quill.root
    // @ts-ignore
    if (scrollContainer === window || scrollContainer === document.documentElement) scrollContainer = undefined
    options.scrollContainer = scrollContainer

    if (!isFunction(options.topOffset) && Number.isNaN(options.topOffset)) options.topOffset = 0

    return Object.assign({
      hideClass: `${namespace}-hidden`,
      topOffset: 0,
      scrollContainer,
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
    item.addEventListener('click', async () => {
      const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      const selector = headerTags.map(tag => `:scope > ${tag}[id="${id}"]`).join(', ')
      const targetHeader = this.quill.root.querySelector(selector) as HTMLElement
      if (targetHeader) {
        const container = this.options.scrollContainer || document.documentElement
        // if container is window. then need add editor root offsetTop to scrollTo
        let containerOffsetTop = 0
        if (container === document.documentElement) {
          const rect = this.quill.root.getBoundingClientRect()
          containerOffsetTop = rect.top + window.scrollY
        }
        const topOffset = isFunction(this.options.topOffset) ? await this.options.topOffset() : this.options.topOffset
        const offsetPosition = containerOffsetTop + targetHeader.offsetTop - topOffset
        container.scrollTo({
          top: offsetPosition,
        })
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
    this.activeToolbarControl()
  }

  async showList() {
    if (await this.options.onBeforeShow()) return
    this.options.container.classList.remove(this.options.hideClass)
    this.isHidden = false
    this.activeToolbarControl()
  }

  activeToolbarControl() {
    const toolbarModule = this.quill.getModule('toolbar') as TypeToolbar
    if (!toolbarModule) return

    const control = toolbarModule.controls.find(([n]) => n === HeaderList.toolName)
    if (!control) return
    if (this.isHidden) {
      control[1].classList.remove('ql-active')
    }
    else {
      control[1].classList.add('ql-active')
    }
  }

  toggleDisplay() {
    if (this.isHidden) {
      return this.showList()
    }
    else {
      return this.hideList()
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

  setHighlight(item: Element) {
    if (this.highlightedItem) {
      this.highlightedItem.classList.remove('highlight')
    }
    item.classList.add('highlight')
    this.highlightedItem = item
  }

  handleIntersection(entries: IntersectionObserverEntry[]) {
    const headers: IntersectionObserverEntry[] = []
    // find the headers in the scrllContainer viewport
    for (const entry of entries) {
      if (isElementInViewport(entry.target, this.options.scrollContainer)) {
        headers.push(entry)
      }
    }
    // find the header at the top
    const entry = headers.reduce((entry, current) => {
      if (!entry || entry.boundingClientRect.y > current.boundingClientRect.y) {
        return current
      }
      return entry
    }, null)
    let header
    if (!entry || entry.isIntersecting === false) {
      // if header doesn't found or header doesn't in the viewport intersection. find the bottommost header above the viewport intersection
      let offset = 0
      for (const [i, { el }] of this.previousHeaders.entries()) {
        const elOffset = el.offsetTop
        if (!isElementInViewport(el, this.options.scrollContainer)) {
          if (offset < elOffset) {
            header = el
            offset = elOffset
          }
        }
        else {
          if (!header) {
            header = el
          }
          break
        }
      }
    }
    else {
      header = entry.target
    }
    const headerId = header.id
    const listItem = this.root.querySelector(`:scope > [data-id="${headerId}"]`)
    if (listItem) {
      this.setHighlight(listItem)
    }
  }
}
