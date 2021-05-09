import { Config, Features } from './types'

type envConfig = {
  [key: string]: Features
}

export class ObjectConfig implements Config {
  private env: string
  private config: Features = {}

  constructor(config: envConfig, env: string) {
    this.env = env
    this.config = this.env ? config[this.env] : {}
  }

  fetch(): Promise<Features> {
    return Promise.resolve<Features>(this.config)
  }

  getValue(key: string): boolean | null {
    if (!this.config.hasOwnProperty(key)) {
      return null
    }

    return this.config[key]
  }
}
