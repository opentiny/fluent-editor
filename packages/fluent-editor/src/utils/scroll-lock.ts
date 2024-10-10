let scrollBarWidth: number
export function getScrollBarWidth({ target = document.body } = {}): number {
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = 'scroll__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  target.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

export function lockScroll({ target = document.body } = {}) {
  let scrollBarWidth = 0
  let originWidth = '0'

  const clockClass = 'scroll--lock'

  const cleanLock = () => {
    target && (target.style.width = originWidth)
    target.classList.remove(clockClass)
  }

  const hasHiddenClass = target.classList.contains(clockClass)
  if (!hasHiddenClass) {
    originWidth = target.style.width
  }
  scrollBarWidth = getScrollBarWidth({ target })
  const hasOverflow = (target === document.body ? document.documentElement : target).clientHeight < target.scrollHeight
  const overflowY = window.getComputedStyle(target).overflowY
  // only when the scrollbar exists needs to reduce width
  if (scrollBarWidth > 0 && (hasOverflow || overflowY === 'scroll') && !hasHiddenClass) {
    target.style.width = `calc(100% - ${scrollBarWidth}px)`
  }
  target.classList.add(clockClass)

  return cleanLock
}
