export class RemoteConfig {
  constructor(fetcher) {
    if (typeof fetcher === 'function') {
      this.fetcher = fetcher
    } else {
      throw new Error(`'fetcher' must be a function`)
    }
  }

  fetch() {
    try {
      return this.fetcher()
        .then(config => {
          return (this.config = config)
        })
        .catch(() => {
          return (this.config = {})
        })
    } catch (e) {
      return (this.config = {})
    }
  }

  getValue(key) {
    if (!this.config || !this.config.hasOwnProperty(key)) {
      return null
    }

    return this.config[key]
  }
}
