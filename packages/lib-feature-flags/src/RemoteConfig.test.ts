import { RemoteConfig } from './RemoteConfig'

const name = 'feature_name'

const envConfig = {
  [name]: true,
}

describe('RemoteConfig', () => {
  describe('fetch', () => {
    test('should return a config', async () => {
      const fetcher = () => Promise.resolve(envConfig)

      const config = new RemoteConfig(fetcher)
      expect(await config.fetch()).toEqual(envConfig)
    })

    test('should set internal config property as an empty object if fetcher rejects promise', async () => {
      const fetcher = () => Promise.reject(envConfig)

      const remoteConfig = new RemoteConfig(fetcher)
      expect(await remoteConfig.fetch()).toEqual({})
    })
  })

  describe('getValue', () => {
    test('should get value for a key', async () => {
      const fetcher = () => Promise.resolve(envConfig)

      const config = new RemoteConfig(fetcher)
      await config.fetch()
      expect(config.getValue(name)).toEqual(envConfig[name])
    })

    test('should return null if a key is missing in a config', async () => {
      const fetcher = () => Promise.resolve(envConfig)

      const config = new RemoteConfig(fetcher)
      await config.fetch()
      expect(config.getValue('missing_key')).toBeNull()
    })
  })
})
