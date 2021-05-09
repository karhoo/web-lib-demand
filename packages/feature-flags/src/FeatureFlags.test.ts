import { FeatureFlags } from './FeatureFlags'
import { Config } from './types'

let MockConfig: Config
const name = 'feature_name'

describe('FeatureFlags', () => {
  beforeEach(() => {
    MockConfig = {
      fetch: jest.fn(() => Promise.resolve({})),
      getValue: jest.fn(() => true),
    }
  })

  describe('toggle', () => {
    test('should toggle feature', async () => {
      const flags = new FeatureFlags(MockConfig)
      await flags.init()

      const name = 'feature_name'

      expect(flags.isEnabled(name)).toEqual(true)

      flags.toggle(name, false)
      expect(flags.isEnabled(name)).toEqual(false)

      flags.toggle(name, true)
      expect(flags.isEnabled(name)).toEqual(true)
    })

    test('should notify subscribers', async () => {
      const onChange = jest.fn()
      const flags = new FeatureFlags(MockConfig)
      await flags.init()
      flags.listen(onChange)

      const name = 'feature_name'
      flags.toggle(name, false)

      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('enable', () => {
    let flags: any
    let onChange: Function
    beforeEach(async () => {
      onChange = jest.fn()
      flags = new FeatureFlags({
        ...MockConfig,
        getValue: jest.fn(() => false),
      })

      await flags.init()
      flags.listen(onChange)
    })

    test('should enable feature', () => {
      expect(flags.isEnabled(name)).toEqual(false)

      flags.enable(name)
      expect(flags.isEnabled(name)).toEqual(true)
    })

    test('should notify subscribers', async () => {
      flags.enable(name)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledWith(flags.features)
    })
  })

  describe('disable', () => {
    test('should disable feature', async () => {
      const flags = new FeatureFlags(MockConfig)
      await flags.init()

      expect(flags.isEnabled(name)).toEqual(true)

      flags.disable(name)
      expect(flags.isEnabled(name)).toEqual(false)
    })

    test('should notify subscribers', async () => {
      const onChange = jest.fn()
      const flags = new FeatureFlags(MockConfig)
      await flags.init()
      flags.listen(onChange)

      flags.disable(name)

      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('isEnabled', () => {
    test('should return true if a feature is enabled in a config', async () => {
      const flags = new FeatureFlags(MockConfig)
      await flags.init()

      expect(flags.isEnabled(name)).toEqual(true)
      expect(MockConfig.getValue).toHaveBeenCalledWith(name)
    })

    test('should return false if a feature is disabled localy but enabled in a config', async () => {
      const flags = new FeatureFlags(MockConfig)
      await flags.init()

      expect(flags.isEnabled(name)).toEqual(true)
      flags.disable(name)
      expect(flags.isEnabled(name)).toEqual(false)
    })

    test('should return a default value if a feature key is missing in a config', async () => {
      const flags = new FeatureFlags(MockConfig, {
        defaultValueForMissingKeys: true,
      })

      await flags.init()

      expect(flags.isEnabled('missing_key')).toEqual(true)
    })
  })

  describe('init', () => {
    test('should fetch config', async () => {
      const flags = new FeatureFlags(MockConfig)
      await flags.init()

      expect(MockConfig.fetch).toHaveBeenCalled()
    })

    test('should return FeatureFlags instance', async () => {
      const flags = new FeatureFlags(MockConfig)
      const instance = await flags.init()

      expect(instance).toBeInstanceOf(FeatureFlags)
    })
  })
})
