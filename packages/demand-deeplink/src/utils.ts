/* eslint @typescript-eslint/no-explicit-any: 0 */
export const isNotEmptyString = (value: any) => typeof value === 'string' && !!value.trim()

export const isPositiveInteger = (value: any) =>
  typeof value === 'number' && !isNaN(value) && value % 1 === 0 && value > 0

export const isObject = (value: any) => Object.prototype.toString.call(value) === '[object Object]'

export const excludeUndefined = <T>(arr: Array<T | undefined>) => arr.filter(el => !!el) as T[]
