import firebase from 'firebase/app'
import { FirebaseAppConfig, FirebaseRemoteConfig } from './FirebaseRemoteConfig'

jest.mock('firebase/app', () => {
  const remoteConfig = {
    ensureInitialized: jest.fn(),
    fetchAndActivate: jest.fn(),
    getAll: jest.fn(() => ({})),
    getValue: jest.fn(() => ({
      asBoolean: jest.fn(),
      asString: jest.fn(),
    })),
  }

  return {
    initializeApp: jest.fn(),
    remoteConfig: jest.fn(() => remoteConfig),
  }
})
jest.mock('firebase/firebase-remote-config', () => ({}))

describe('FirebaseRemoteConfig', () => {
  const appConfig = { apiKey: 'apiKey' } as FirebaseAppConfig

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call initializeApp', () => {
    new FirebaseRemoteConfig(appConfig)

    expect(firebase.initializeApp).toBeCalledWith(appConfig)
  })

  it('should call remoteConfig', () => {
    new FirebaseRemoteConfig(appConfig)

    expect(firebase.remoteConfig).toBeCalledTimes(2)
  })

  it('should set remoteConfigSettings to remoteConfig', () => {
    const firebaseConfig = new FirebaseRemoteConfig(appConfig)

    expect(firebaseConfig.config.settings).toEqual({
      minimumFetchIntervalMillis: 3600000,
    })
  })

  describe('fetch', () => {
    let firebaseConfig: FirebaseRemoteConfig

    beforeEach(() => {
      firebaseConfig = new FirebaseRemoteConfig(appConfig)
    })

    it('should call ensureInitialized', async () => {
      await firebaseConfig.fetch()

      expect(firebaseConfig.config.ensureInitialized).toBeCalledTimes(1)
    })

    it('should call fetchAndActivate', async () => {
      await firebaseConfig.fetch()

      expect(firebaseConfig.config.fetchAndActivate).toBeCalledTimes(1)
    })

    it('should call getAll', async () => {
      await firebaseConfig.fetch()

      expect(firebaseConfig.config.getAll).toBeCalledTimes(1)
    })

    it('should isActivated be true', async () => {
      await firebaseConfig.fetch()

      expect(firebaseConfig.isActivated).toBe(true)
    })
  })

  describe('getValue', () => {
    let firebaseConfig: FirebaseRemoteConfig

    beforeEach(() => {
      firebaseConfig = new FirebaseRemoteConfig(appConfig)
    })

    it('should return null if isActivated is false', () => {
      const value = firebaseConfig.getValue('test')

      expect(value).toBe(null)
    })

    it('should return true', async () => {
      ;(firebaseConfig.config.getValue as jest.Mock).mockImplementationOnce(() => ({
        asString() {
          return 'true'
        },
        asBoolean() {
          return true
        },
      }))

      await firebaseConfig.fetch()

      const value = firebaseConfig.getValue('test')

      expect(value).toBe(true)
    })

    it('should return null', async () => {
      ;(firebaseConfig.config.getValue as jest.Mock).mockImplementationOnce(() => ({
        asString() {
          return ''
        },
        asBoolean() {
          return ''
        },
      }))

      await firebaseConfig.fetch()

      const value = firebaseConfig.getValue('test')

      expect(value).toBe(null)
    })

    it('should call getValue', async () => {
      const key = 'test'

      await firebaseConfig.fetch()

      firebaseConfig.getValue(key)

      expect(firebaseConfig.config.getValue).toBeCalledWith(key)
    })
  })
})
