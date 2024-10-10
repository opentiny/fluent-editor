import type html2canvas from 'html2canvas'
import type { Options as Html2CanvasOptions } from 'html2canvas'
import type Toolbar from 'quill/modules/toolbar'
import Quill from 'quill'
import { imgToBase64 } from '../utils/image'
import { lockScroll } from '../utils/scroll-lock'

const Delta = Quill.import('delta')

export type ScreenShotOptions = Partial<Html2CanvasOptions> & {
  Html2Canvas: typeof html2canvas
  beforeCreateCanvas: () => void | Promise<void>
  beforeCreateImage: (canvas: HTMLCanvasElement) => HTMLCanvasElement | string | Promise<HTMLCanvasElement | string>
}
interface ScreenShotOptionsInQuill {
  quill: {
    options: {
      screenshot: Partial<ScreenShotOptions>
    }
  }
}

function resolveOptions(options: Partial<ScreenShotOptions>) {
  return Object.assign({
    // @ts-ignore
    Html2Canvas: window.Html2Canvas,
    useCORS: true,
    scale: 1,
    foreignObjectRendering: true,
    beforeCreateImage: undefined,
    beforeCreateCanvas: undefined,
  }, options)
}

function init() {
  const maskExits = document.querySelectorAll('.ql-screenshot-mask')
  if (maskExits) {
    maskExits.forEach(item => item && item.remove())
  }
  // 创建截图图层
  const wrapper = document.createElement('div')
  wrapper.classList.add('ql-screenshot-wrapper')
  const mask = document.createElement('div')
  mask.className = 'ql-screenshot-mask'
  const cutter = document.createElement('div')
  cutter.className = 'ql-screenshot-cutter'
  const coordinate = document.createElement('p')
  coordinate.className = 'ql-screenshot-coordinate'
  cutter.appendChild(coordinate)
  wrapper.appendChild(mask)
  wrapper.appendChild(cutter)
  document.body.appendChild(wrapper)
  return { wrapper, mask, cutter, coordinate }
}

function findParentFixed(dom: HTMLElement) {
  if (dom.tagName === 'BODY') return false
  if (['fixed', 'sticky'].includes(dom.parentElement.style.position)) return true
  return findParentFixed(dom.parentElement)
}
async function renderImage(
  Html2Canvas: typeof html2canvas,
  html2canvasOptions: Partial<Html2CanvasOptions>,
  rect: DOMRect,
  options?: Omit<ScreenShotOptions, 'Html2Canvas' | keyof Html2CanvasOptions>,
) {
  if (options && options.beforeCreateCanvas) {
    await options.beforeCreateCanvas()
  }
  const canvas: CanvasImageSource = await Html2Canvas(document.body, {
    ...html2canvasOptions,
    onclone: async (doc: Document, el: HTMLElement) => {
      // find all fixed or sticky dom
      const fixedDom = Array.from(doc.querySelectorAll('*[style*="position: fixed"]')) as HTMLElement[]
      const stickyDom = Array.from(doc.querySelectorAll('*[style*="position: sticky"]')) as HTMLElement[]
      const fixedDomList = new Set([...fixedDom, ...stickyDom])
      for (const dom of fixedDomList) {
        // if parent dom already has fixed or sticky style
        // means that transform will be settle. skip
        if (findParentFixed(dom)) continue
        // use transform move to correct position
        let x = 0
        let y = 0
        if (dom.style.top !== 'auto') {
          y = window.scrollY
        }
        if (dom.style.left !== 'auto') {
          x = window.scrollX
        }
        if (x !== 0 || y !== 0) {
          dom.style.transform = `translate(${x}px, ${y}px)`
        }
      }

      const imgs = doc.querySelectorAll('img')
      const promises = Array.from(imgs).map(async (img) => {
        img.src = await imgToBase64(img.src)
      })
      await Promise.all(promises)
      html2canvasOptions.onclone && await html2canvasOptions.onclone(doc, el)
    },
  })
  // 当前canvas为body全局截图，从当前截图中截取想要的部分重新绘制转成base64插入富文本
  let cropCanvas: HTMLCanvasElement | string = document.createElement('canvas')
  cropCanvas.width = rect.width
  cropCanvas.height = rect.height
  const cropCanvasCtx = cropCanvas.getContext('2d')
  cropCanvasCtx.drawImage(
    canvas,
    rect.x + window.scrollX,
    rect.y + window.scrollY,
    rect.width,
    rect.height,
    0,
    0,
    rect.width,
    rect.height,
  )
  if (options && options.beforeCreateImage) {
    cropCanvas = await options.beforeCreateImage(cropCanvas)
  }
  return typeof cropCanvas === 'string' ? cropCanvas : cropCanvas.toDataURL()
}

export function Screenshot(this: Toolbar & ScreenShotOptionsInQuill) {
  this.quill.options.screenshot = resolveOptions(this.quill.options.screenshot)
  const options = this.quill.options.screenshot
  // @ts-ignore
  const { Html2Canvas, beforeCreateImage, beforeCreateCanvas, ...html2CanvasOptions } = options
  if (!Html2Canvas) {
    throw new Error('ScreenShot module requires html2canvas. Please include the library on the page before FluentEditor.')
  }
  const range = this.quill.getSelection()
  const { wrapper, mask, cutter, coordinate } = init()
  const status: {
    leftClickLockFlag: boolean
    start?: {
      x: number
      y: number
    }
  } = {
    leftClickLockFlag: false,
    start: undefined,
  }
  const cleanLock = lockScroll()

  const removeContextmenu = (event: Event) => {
    event.preventDefault()
    wrapper.remove()
    cleanLock()
    document.removeEventListener('contextmenu', removeContextmenu)
  }
  const afterShotCtrl = async (event: MouseEvent) => {
    document.removeEventListener('mousedown', toggleRect)
    const cutterRect = cutter.getBoundingClientRect()
    const target = event.target as HTMLElement
    wrapper.remove()
    cleanLock()
    if (target && target.className === 'ql-screenshot-confirm') {
      const image = await renderImage(Html2Canvas, html2CanvasOptions, cutterRect, { beforeCreateCanvas, beforeCreateImage })

      const delta = new Delta()
        .retain(range.index)
        .delete(range.length)
        .insert({ image })
      this.quill.updateContents(delta, Quill.sources.USER)
      this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
    }
    status.start = undefined
  }
  const drawRect = (event: MouseEvent) => {
    // 通过鼠标移动描绘截图图层
    const startX = status.start.x
    const startY = status.start.y
    const endX = event.clientX
    const endY = event.clientY
    const width = Math.abs(endX - startX)
    const height = Math.abs(endY - startY)
    const top = startY < endY ? startY : endY
    const left = startX < endX ? startX : endX
    const bottom = window.innerHeight - height - top
    const right = window.innerWidth - width - left

    const maskPath = `
      linear-gradient(to top, #fff, #fff) top / 100% ${top}px,
      linear-gradient(to bottom, #fff, #fff) bottom /100% ${bottom}px,
      linear-gradient(to left, #fff, #fff) left / ${left}px 100%,
      linear-gradient(to right, #fff, #fff) right / ${right}px 100%
    `
    Object.assign(cutter.style, {
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
    })
    Object.assign(mask.style, {
      'mask': maskPath,
      '-webkit-mask-repeat': 'no-repeat',
    })
    coordinate.textContent = `${width}, ${height}`
  }
  const toggleRect = (event: MouseEvent) => {
    // 右键取消截图操作
    if (event.button === 2) {
      document.removeEventListener('mousemove', drawRect)
      document.removeEventListener('mousedown', toggleRect)
      document.addEventListener('contextmenu', removeContextmenu)
      return
    }
    if (!status.leftClickLockFlag) {
      if (status.start) {
        // 如果有起点，则当前触发坐标为终点，移除监听事件并添加确认和取消按钮
        document.removeEventListener('mousemove', drawRect)
        const doneBtn = document.createElement('div')
        doneBtn.innerHTML = `<div class="ql-screenshot-confirm"></div><div class="ql-screenshot-cancel"></div>`
        doneBtn.className = 'ql-screenshot-done'
        doneBtn.addEventListener('click', afterShotCtrl)
        coordinate.remove()
        cutter.appendChild(doneBtn)
        status.leftClickLockFlag = true
      }
      else {
        // 无起点则设置起点坐标，监听鼠标移动
        status.start = { x: event.clientX, y: event.clientY }
        document.addEventListener('mousemove', drawRect)
      }
    }
  }
  document.addEventListener('mousedown', toggleRect)
}
Screenshot.toolName = 'screenshot'
