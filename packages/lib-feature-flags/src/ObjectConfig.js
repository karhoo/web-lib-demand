export class ObjectConfig {
  env
  config

  constructor(config, env) {
    this.env = env
    this.config = (this.env && config[this.env]) || {}
  }

  fetch() {
    return Promise.resolve(this.config)
  }

  getValue(key) {
    if (!this.config.hasOwnProperty(key)) {
      return null
    }

    return this.config[key]
  }
}
