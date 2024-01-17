import firebase from 'firebase/app'
import 'firebase/firebase-remote-config'
import { Config, Features } from './types'

const remoteConfigSettings = {
  minimumFetchIntervalMillis: 3600000,
}

export type FirebaseAppConfig = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export class FirebaseRemoteConfig implements Config {
  public isActivated: boolean

  get config() {
    return firebase.remoteConfig()
  }

  constructor(appConfig: FirebaseAppConfig) {
    if (!appConfig.apiKey) {
      throw new Error('Firebase config is not provided!')
    }

    this.isActivated = false

    firebase.initializeApp(appConfig)

    this.config.settings = {
      ...this.config.settings,
      ...remoteConfigSettings,
    }
  }

  async fetch(): Promise<Features> {
    await this.config.ensureInitialized()
    await this.config.fetchAndActivate()

    const config = this.config.getAll()
    const items = Object.keys(config).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.config.getValue(curr).asBoolean(),
      }),
      {}
    )

    this.isActivated = true

    return items
  }

  getValue(key: string): boolean | null {
    if (!this.isActivated) {
      return null
    }

    const value = this.config.getValue(key)

    if (!value.asString()) {
      return null
    }

    return value.asBoolean()
  }
}
