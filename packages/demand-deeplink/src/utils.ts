/* eslint @typescript-eslint/no-explicit-any: 0 */
import isUndefined from 'lodash/isUndefined'
import negate from 'lodash/negate'
import snakeCase from 'lodash/snakeCase'

export const isNotEmptyString = (value: any) => typeof value === 'string' && !!value.trim()

export const isPositiveInteger = (value: any) =>
  typeof value === 'number' && !isNaN(value) && value % 1 === 0 && value > 0

export const isObject = (value: any) => Object.prototype.toString.call(value) === '[object Object]'

export const excludeUndefined = <T>(arr: Array<T | undefined>) => arr.filter(negate(isUndefined)) as T[]

export const toSnakeCase = <T extends object = object, Y extends object = T>(data: T) =>
  (Object.keys(data) as Array<keyof T>).reduce(
    (result, key) => ({ ...result, [snakeCase(key as string)]: data[key] }),
    {} as Y
  )
