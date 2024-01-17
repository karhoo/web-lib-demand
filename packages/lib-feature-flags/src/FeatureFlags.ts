import { Features, Config, DefaultOptions } from './types'

export const defaultOptions: DefaultOptions = {
  defaultValueForMissingKeys: false,
}

export class FeatureFlags {
  private features: Features = {}

  private config: Config

  private onChange?: Function

  private defaultValueForMissingKeys: boolean

  constructor(config: Config, options: DefaultOptions = defaultOptions) {
    this.config = config
    this.defaultValueForMissingKeys = options.defaultValueForMissingKeys
  }

  public async init(): Promise<this> {
    const features = await this.config.fetch()
    this.updateFeatures(features)
    return this
  }

  private updateFeatures(newFeature: Record<string, boolean> = {}): void {
    this.features = { ...this.features, ...newFeature }
    this.onChange && this.onChange(this.features)
  }

  public listen(
    onChange: (features: Features) => void = _ => {
      //do nothing
    }
  ): void {
    this.onChange = onChange
    this.onChange(this.features)
  }

  public toggle(key: string, value: boolean): void {
    this.updateFeatures({ [key]: value })
  }

  public enable(key: string): void {
    this.updateFeatures({ [key]: true })
  }

  public disable(key: string): void {
    this.updateFeatures({ [key]: false })
  }

  public isEnabled(key: string): boolean {
    if (this.features.hasOwnProperty(key)) {
      return this.features[key]
    }

    const value = this.config.getValue ? this.config.getValue(key) : null
    return value === null ? this.defaultValueForMissingKeys : value
  }
}
