export const defaultOptions = {
  defaultValueForMissingKeys: false,
}

export class FeatureFlags {
  features = {}

  config

  onChange

  defaultValueForMissingKeys

  constructor(config, options = defaultOptions) {
    this.config = config
    this.defaultValueForMissingKeys =
      options.defaultValueForMissingKeys || defaultOptions.defaultValueForMissingKeys
  }

  init = async () => {
    const features = await this.config.fetch()
    this.updateFeatures(features)
    return this
  }

  listen(onChange = () => {}) {
    this.onChange = onChange
    this.onChange(this.features)
  }

  updateFeatures(newFeature = {}) {
    this.features = { ...this.features, ...newFeature }
    this.onChange && this.onChange(this.features)
  }

  toggle(key, value) {
    this.updateFeatures({ [key]: value })
  }

  enable(key) {
    this.updateFeatures({ [key]: true })
  }

  disable(key) {
    this.updateFeatures({ [key]: false })
  }

  isEnabled(key) {
    if (this.features.hasOwnProperty(key)) {
      return this.features[key]
    }

    const value = this.config.getValue ? this.config.getValue(key) : null
    return value === null ? this.defaultValueForMissingKeys : value
  }
}
