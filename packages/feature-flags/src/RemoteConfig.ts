import { Config, Features } from './types'

export class RemoteConfig implements Config {
  private fetcher: () => Promise<Features>
  private config: Features = {}

  constructor(fetcher: () => Promise<Features>) {
    this.fetcher = fetcher
  }

  public fetch(): Promise<Features> {
    try {
      return this.fetcher()
        .then(config => {
          return (this.config = config)
        })
        .catch(() => {
          return this.config
        })
    } catch (e) {
      return Promise.reject<Features>(this.config)
    }
  }

  public getValue(key: string): boolean | null {
    if (!this.config || !this.config.hasOwnProperty(key)) {
      return null
    }

    return this.config[key]
  }
}
