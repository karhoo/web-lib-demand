import { ObjectConfig } from './ObjectConfig'

const env = 'dev'
const name = 'feature_name'

const envConfig = {
  [name]: true,
}

const initialConfig = {
  [env]: envConfig,
}

describe('ObjectConfig', () => {
  describe('constructor', () => {
    test('should return an empty object if env is not passed', async () => {
      const config = new ObjectConfig(initialConfig)

      expect(await config.fetch()).toEqual({})
    })

    test('should set a config based on a passed enviroment', () => {
      const actual = new ObjectConfig(initialConfig, env)

      expect(actual.config).toEqual(envConfig)
    })
  })

  describe('fetch', () => {
    test('should return a config', async () => {
      const config = new ObjectConfig(initialConfig, env)
      expect(await config.fetch()).toEqual(envConfig)
    })
  })

  describe('getValue', () => {
    test('should get value for a key', () => {
      const config = new ObjectConfig(initialConfig, env)
      expect(config.getValue(name)).toEqual(envConfig[name])
    })

    test('should return null if a key is missing in a config', () => {
      const config = new ObjectConfig(initialConfig, env)
      expect(config.getValue('missing_key')).toBeNull()
    })
  })
})
