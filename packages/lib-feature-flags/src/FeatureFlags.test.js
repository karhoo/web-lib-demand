import { FeatureFlags, defaultOptions } from './FeatureFlags'

let MockConfig
const name = 'feature_name'

describe('FeatureFlags', () => {
  beforeEach(() => {
    MockConfig = {
      fetch: jest.fn(() => Promise.resolve({})),
      getValue: jest.fn(() => true),
    }
  })

  describe('constructor', () => {
    test('should accept config', () => {
      const actual = new FeatureFlags(MockConfig)
      expect(actual.config).toEqual(MockConfig)
    })

    test('should accept additional configuration options', () => {
      const actual = new FeatureFlags(MockConfig, {
        defaultValueForMissingKeys: true,
      })

      expect(actual.defaultValueForMissingKeys).toEqual(true)
    })

    test('should fallback to default option if additional configuration options are not passed', () => {
      const actual = new FeatureFlags(MockConfig)

      expect(actual.defaultValueForMissingKeys).toEqual(defaultOptions.defaultValueForMissingKeys)
    })
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
      expect(onChange).toHaveBeenCalledWith(flags.features)
    })
  })

  describe('enable', () => {
    let flags
    let onChange

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
      expect(onChange).toHaveBeenCalledWith(flags.features)
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

  describe('listen', () => {
    test('should accept onChange listener', async () => {
      const onChange = jest.fn()
      const flags = new FeatureFlags(MockConfig)
      await flags.init()
      flags.listen(onChange)

      expect(flags.onChange).toEqual(onChange)
    })

    test('should use an empty function if onChange listener is not passed', async () => {
      const flags = new FeatureFlags(MockConfig)
      await flags.init()
      flags.listen()

      expect(typeof flags.onChange).toEqual('function')
    })
  })

  describe('updateFeatures', () => {
    test('should update feature list and call onChange', async () => {
      const flags = new FeatureFlags(MockConfig)
      const onChange = jest.fn()
      const testFeature = { testFeature: true }
      await flags.init()
      flags.listen(onChange)
      flags.updateFeatures(testFeature)

      expect(flags.isEnabled('testFeature')).toEqual(true)
      expect(onChange).toHaveBeenLastCalledWith(testFeature)
    })
  })
})
