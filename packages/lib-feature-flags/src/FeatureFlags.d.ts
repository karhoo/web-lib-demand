import { Features } from './Features'
import { ObjectConfig } from './ObjectConfig'

export type FeatureConfig = ObjectConfig

export type DefaultOptions = {
  defaultValueForMissingKeys?: boolean
}

export class FeatureFlags {
  config: FeatureConfig
  defaultValueForMissingKeys: boolean
  features: Features
  onChange: Function

  private constructor(appConfig: FeatureConfig, options: DefaultOptions)

  init(): Promise<Features>

  listen(onChange: Function): void
  updateFeatures(newFeature: Record<string, boolean>): void
  toggle(key: string, value: boolean): void
  enable(key: string): void
  disable(key: string): void
  isEnabled(key: string): boolean
}
