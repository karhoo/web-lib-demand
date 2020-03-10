export const isNotEmptyString = (value: any) => typeof value === 'string' && !!value.trim() // eslint-disable-line

export const isPositiveInteger = (value: any) => typeof value === 'number' && !isNaN(value) && value % 1 === 0 && value > 0 // eslint-disable-line

export const isObject = (value: any) => Object.prototype.toString.call(value) === '[object Object]' // eslint-disable-line