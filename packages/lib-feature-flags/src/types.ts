export type Features = {
  [key: string]: boolean
}

export interface Config {
  fetch(): Promise<Features>
  getValue(key: string): boolean | null
}

export type DefaultOptions = {
  defaultValueForMissingKeys: boolean
}

export interface FeatureFlagsInterface {
  config: Config
  defaultValueForMissingKeys: boolean
  features: Features
  onChange: Function

  init(): Promise<Features>

  listen(onChange: Function): void
  updateFeatures(newFeature: Record<string, boolean>): void
  toggle(key: string, value: boolean): void
  enable(key: string): void
  disable(key: string): void
  isEnabled(key: string): boolean
}
