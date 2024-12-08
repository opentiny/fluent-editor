export function isObject(value: unknown): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
export const isUndefined = (val: unknown): val is undefined => val === undefined
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
/**
 * 判断子元素是否在可滚动的父元素的可视范围内。
 *
 * @param {HTMLElement} box - 父元素，可滚动的容器
 * @param {HTMLElement} child - 需要判断的子元素
 * @returns {boolean} - 如果子元素在父元素的可视范围内，则返回 true；否则返回 false。
 */
export function isElementInViewport(box: HTMLElement, child: HTMLElement): boolean {
  const boxRect = box.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()
  return !(
    childRect.bottom < boxRect.top
    || childRect.top > boxRect.bottom
    || childRect.right < boxRect.left
    || childRect.left > boxRect.right
  )
}
