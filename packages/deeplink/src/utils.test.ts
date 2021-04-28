import { isObject, isNotEmptyString, isPositiveInteger, excludeUndefined } from './utils'

describe('utils', () => {
  describe('isObject', () => {
    it('should return true', () => {
      expect(isObject({})).toEqual(true)
    })

    it('should return false if not an object', () => {
      expect(isObject(undefined)).toEqual(false)
    })
  })

  describe('isNotEmptyString', () => {
    it('should return true', () => {
      expect(isNotEmptyString('test')).toEqual(true)
    })

    it('should return false if not a string', () => {
      expect(isNotEmptyString(20)).toEqual(false)
    })

    it('should return false for empty string', () => {
      expect(isNotEmptyString('')).toEqual(false)
    })

    it('should return false for string that contains only spaces', () => {
      expect(isNotEmptyString('   ')).toEqual(false)
    })
  })

  describe('isPositiveInteger', () => {
    it('should return true', () => {
      expect(isPositiveInteger(100)).toEqual(true)
    })

    it('should return false if not a number', () => {
      expect(isPositiveInteger(undefined)).toEqual(false)
    })

    it('should return false if NaN', () => {
      expect(isPositiveInteger(NaN)).toEqual(false)
    })

    it('should return false if float', () => {
      expect(isPositiveInteger(2.22)).toEqual(false)
    })

    it('should return false if negative number', () => {
      expect(isPositiveInteger(-2)).toEqual(false)
    })
  })

  describe('excludeUndefined', () => {
    it('should exclude undefined', () => {
      expect(excludeUndefined(['test', undefined, 2])).toEqual(['test', 2])
    })
  })
})
