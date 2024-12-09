export function isObject(value: unknown): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
export const isUndefined = (val: unknown): val is undefined => val === undefined
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
/**
 * 判断子元素是否在指定的可滚动父元素的可视范围内。
 * 如果未提供父元素，则默认使用屏幕的可视区域。
 *
 * @param {Element} child - 需要判断的子元素
 * @param {Element | undefined} box - 父元素，可滚动的容器。如果不提供，则默认为屏幕的可视区域。
 * @returns {boolean} - 如果子元素在父元素的可视范围内，则返回 true；否则返回 false。
 */
export function isElementInViewport(child: Element, box?: Element): boolean {
  const boxRect = box
    ? box.getBoundingClientRect()
    : {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth,
      }
  const childRect = child.getBoundingClientRect()
  return !(
    childRect.bottom < boxRect.top
    || childRect.top > boxRect.bottom
    || childRect.right < boxRect.left
    || childRect.left > boxRect.right
  )
}
