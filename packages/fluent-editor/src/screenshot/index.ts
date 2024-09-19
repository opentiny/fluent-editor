import Quill from 'quill'
import type { Range } from 'quill'
import type Toolbar from 'quill/modules/toolbar'

const Delta = Quill.import('delta')

export interface ScreenShotOptions {
  Html2Canvas: any
  screenshotOnStaticPage: boolean
}
// type ScreenShotOptionsInQuill = {
//   quill: {
//     options: {
//       screenshot: Partial<ScreenShotOptions>
//     }
//   }
// }

// const resolveOptions = (options: Partial<ScreenShotOptions>) => {
//   return Object.assign({
//     // @ts-ignore
//     Html2Canvas: window.Html2Canvas,
//     screenshotOnStaticPage: false,
//   }, options)
// }

// const init = () => {
//   const maskExits = document.querySelectorAll('.ql-screenshot-mask')
//   if (maskExits) {
//     maskExits.forEach(item => item && item.remove())
//   }
//   // 创建截图图层
//   const mask = document.createElement('div')
//   mask.className = 'ql-screenshot-mask'
//   const cutter = document.createElement('div')
//   cutter.className = 'ql-screenshot-cutter'
//   const coordinate = document.createElement('p')
//   coordinate.className = 'ql-screenshot-coordinate'
//   for (let i = 0; i < 7; i++) {
//     const blockItem = document.createElement('div')
//     blockItem.className = 'ql-screenshot-border-block'
//     cutter.appendChild(blockItem)
//   }
//   cutter.appendChild(coordinate)
//   mask.appendChild(cutter)
//   document.body.appendChild(mask)
//   return {
//     mask,
//     cutter,
//     coordinate,
//   }
// }

// const toggleRect = (event: MouseEvent) => {
//   // 右键取消截图操作
//   if (event.button === 2) {
//     document.removeEventListener('mousemove', this.drawRect)
//     document.removeEventListener('mousedown', this.toggleRect)
//     document.addEventListener('contextmenu', this.removeContextmenu)
//     return
//   }
//   if (!this.leftClickLockFlag) {
//     if (this.start) {
//       // 如果有起点，则当前触发坐标为终点，移除监听事件并添加确认和取消按钮
//       document.removeEventListener('mousemove', this.drawRect)
//       const doneBtn = document.createElement('div')
//       doneBtn.innerHTML = `<span class="ql-screenshot-ok"></span><span class="ql-screenshot-cancel"></span>`
//       doneBtn.className = 'ql-screenshot-done'
//       doneBtn.addEventListener('click', this.afterShotCtrl)
//       this.coordinate.remove()
//       this.cutter.appendChild(doneBtn)
//       this.leftClickLockFlag = true
//     }
//     else {
//       // 无起点则设置起点坐标，监听鼠标移动
//       this.start = { x: event.clientX, y: event.clientY }
//       this.cutter.style.left = `${this.start.x}px`
//       this.cutter.style.top = `${this.start.y}px`
//       document.addEventListener('mousemove', this.drawRect)
//     }
//   }
// }

// export function Screenshot(this: Toolbar & ScreenShotOptionsInQuill) {
//   this.quill.options.screenshot = resolveOptions(this.quill.options.screenshot)
//   const Html2Canvas = this.quill.options.screenshot.Html2Canvas
//   if (!Html2Canvas) {
//     throw new Error('ScreenShot module requires html2canvas. Please include the library on the page before FluentEditor.')
//   }
//   const range = this.quill.getSelection(true)
//   const { mask, cutter, coordinate } = init()
//   document.addEventListener('mousedown', toggleRect)
// }
// Screenshot.toolName = 'screenshot'

type HTML2CanvasOptions = {
  allowTaint: boolean // 是否允许跨域图片渲染
  foreignObjectRendering: boolean // 是否使用svg方式
  logging: boolean // 是否启用日志记录
}
class Screenshot {
  options: ScreenShotOptions
  range?: Range
  cutter: HTMLElement
  mask: HTMLElement
  coordinate: HTMLElement
  width: number
  height: number
  leftClickLockFlag = false
  start: {
    x: number
    y: number
  }

  originOverflow: string
  wrapper: any

  constructor(public quill: Quill, options: Partial<ScreenShotOptions> = {}) {
    this.options = this.resolveOptions(options)
    if (this.options.Html2Canvas == null) {
      throw new Error(
        'ScreenShot module requires html2canvas. Please include the library on the page before FluentEditor.',
      )
    }
    console.log(this)
    this.init()
  }

  resolveOptions(options: Partial<ScreenShotOptions>) {
    return Object.assign({
      // @ts-ignore
      Html2Canvas: window.Html2Canvas,
      screenshotOnStaticPage: false,
    }, options)
  }

  init() {
    const maskExits = document.querySelectorAll('.ql-screenshot-mask')
    if (maskExits) {
      maskExits.forEach(item => item && item.remove())
    }
    // 创建截图图层
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('ql-screenshot-wrapper')
    this.mask = document.createElement('div')
    this.mask.className = 'ql-screenshot-mask'
    this.cutter = document.createElement('div')
    this.cutter.className = 'ql-screenshot-cutter'
    this.coordinate = document.createElement('p')
    this.coordinate.className = 'ql-screenshot-coordinate'
    this.cutter.appendChild(this.coordinate)
    this.wrapper.appendChild(this.mask)
    this.wrapper.appendChild(this.cutter)
    document.body.appendChild(this.wrapper)
    this.range = this.quill.getSelection(true)
    document.addEventListener('mousedown', this.toggleRect)
    document.body.style.overflow = 'hidden'
  }

  removeContextmenu = (event: Event) => {
    event.preventDefault()
    this.wrapper.remove()
    document.removeEventListener('contextmenu', this.removeContextmenu)
  }

  toggleRect = (event: MouseEvent) => {
    // 右键取消截图操作
    if (event.button === 2) {
      document.removeEventListener('mousemove', this.drawRect)
      document.removeEventListener('mousedown', this.toggleRect)
      document.addEventListener('contextmenu', this.removeContextmenu)
      return
    }
    if (!this.leftClickLockFlag) {
      if (this.start) {
        // 如果有起点，则当前触发坐标为终点，移除监听事件并添加确认和取消按钮
        document.removeEventListener('mousemove', this.drawRect)
        const doneBtn = document.createElement('div')
        doneBtn.innerHTML = `<div class="ql-screenshot-ok"></div><div class="ql-screenshot-cancel"></div>`
        doneBtn.className = 'ql-screenshot-done'
        doneBtn.addEventListener('click', this.afterShotCtrl)
        this.coordinate.remove()
        this.cutter.appendChild(doneBtn)
        this.leftClickLockFlag = true
      }
      else {
        // 无起点则设置起点坐标，监听鼠标移动
        this.start = { x: event.clientX, y: event.clientY }
        document.addEventListener('mousemove', this.drawRect)
      }
    }
  }

  drawRect = (event: MouseEvent) => {
    // 通过鼠标移动描绘截图图层
    this.width = Math.abs(event.clientX - this.start.x)
    this.height = Math.abs(event.clientY - this.start.y)
    const startX = this.start.x
    const startY = this.start.y
    const endX = event.clientX
    const endY = event.clientY
    const top = startY < endY ? startY : endY
    const left = startX < endX ? startX : endX
    const bottom = window.innerHeight - this.height - top
    const right = window.innerWidth - this.width - left

    const mask = `
      linear-gradient(to top, #fff, #fff) top / 100% ${top}px,
      linear-gradient(to bottom, #fff, #fff) bottom /100% ${bottom}px,
      linear-gradient(to left, #fff, #fff) left / ${left}px 100%,
      linear-gradient(to right, #fff, #fff) right / ${right}px 100%
    `
    Object.assign(this.cutter.style, {
      width: `${this.width}px`,
      height: `${this.height}px`,
      left: `${left}px`,
      top: `${top}px`,
    })
    Object.assign(this.mask.style, {
      'mask': mask,
      '-webkit-mask-repeat': 'no-repeat',
    })
    this.coordinate.textContent = `${this.width}, ${this.height}`
  }

  afterShotCtrl = (event: MouseEvent) => {
    document.removeEventListener('mousedown', this.toggleRect)
    Object.assign(document.body.style, {
      overflow: null,
    })
    this.wrapper.remove()
    const target = event.target as HTMLElement
    if (target && target.className === 'ql-screenshot-ok') {
      const rect = {
        x: this.start.x,
        y: this.start.y,
        width: this.width,
        height: this.height,
        scrollX: document.body.scrollLeft,
        scrollY: document.body.scrollTop,
        allowTaint: true,
        logging: false,
        foreignObjectRendering: this.options.screenshotOnStaticPage,
      }
      this.renderImage(rect)
    }
    this.start = undefined
  }

  renderImage(rect: HTML2CanvasOptions & {
    x: number
    y: number
    width: number
    height: number
    scrollX: number
    scrollY: number
  }) {
    this.options.Html2Canvas(document.body, {
      allowTaint: rect.allowTaint,
      foreignObjectRendering: rect.foreignObjectRendering,
      logging: rect.logging,
    }).then((canvas: CanvasImageSource) => {
      // 当前canvas为body全局截图，从当前截图中截取想要的部分重新绘制转成base64插入富文本
      const cropCanvas = document.createElement('canvas')
      cropCanvas.width = this.width
      cropCanvas.height = this.height
      const cropCanvasCtx = cropCanvas.getContext('2d')
      cropCanvasCtx.drawImage(
        canvas,
        rect.x + rect.scrollX,
        rect.y + rect.scrollY,
        rect.width,
        rect.height,
        0,
        0,
        rect.width,
        rect.height,
      )
      this.insertEditor(cropCanvas)
      cropCanvas.remove()
    })
  }

  insertEditor(canvas: HTMLCanvasElement) {
    const image = canvas.toDataURL()
    const delta = new Delta()
      .retain(this.range.index)
      .delete(this.range.length)
      .insert({ image })
    this.quill.updateContents(delta, Quill.sources.USER)
    this.quill.setSelection(this.range.index + 1, Quill.sources.SILENT)
  }
}

export default Screenshot
