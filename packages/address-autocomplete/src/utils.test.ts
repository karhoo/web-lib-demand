import { deepMapKeys, snakeToCamel, camelcaseKeys } from './utils'

describe('utils', () => {
  describe('deepMapKeys', () => {
    it('should map keys', () => {
      const data = {
        keys_to_map: 'keys_to_map',
      }

      const expected = {
        KEYS_TO_MAP: 'keys_to_map',
      }

      expect(deepMapKeys(data, key => key.toUpperCase())).toEqual(expected)
    })
  })

  describe('snakeToCamel', () => {
    it('should convert snake case to camel case', () => {
      expect(snakeToCamel('test_map_key')).toEqual('testMapKey')
    })
  })

  describe('camelcaseKeys', () => {
    it('should camel case keys in object', () => {
      const data = {
        keys_to_map: 'keys_to_map',
      }

      const expected = {
        keysToMap: 'keys_to_map',
      }

      expect(camelcaseKeys(data)).toEqual(expected)
    })

    it('should deeply camel case keys in object', () => {
      const data = {
        keys_to_map: 'keys_to_map',
        test: {
          keys_to_map_2: 'keys_to_map_2',
        },
      }

      const expected = {
        keysToMap: 'keys_to_map',
        test: {
          keysToMap2: 'keys_to_map_2',
        },
      }

      expect(camelcaseKeys(data)).toEqual(expected)
    })
  })
})
