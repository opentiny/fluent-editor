export function isObject(value): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
export const isUndefined = (val: unknown): val is undefined => val === undefined
