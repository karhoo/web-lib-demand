/* eslint @typescript-eslint/no-explicit-any: 0 */
import { snakeCase } from 'lodash-es'

export const toSnakeCase = <T extends object = object, Y extends object = T>(data: T) =>
  (Object.keys(data) as Array<keyof T>).reduce(
    (result, key) => ({ ...result, [snakeCase(key as string)]: data[key] }),
    {} as Y
  )
