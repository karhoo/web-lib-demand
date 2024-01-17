import React, { Component, createContext, ReactNode } from 'react'

import { Features } from './types'
import { FeatureFlags } from './FeatureFlags'

type context = {
  isEnabled?(name: string): boolean
}

export const FeatureContext = createContext<context>({})

declare global {
  interface Window {
    Feature: {
      disableFeature(name: string): void
      enableFeature(name: string): void
      isEnabled(name: string): void
    }
  }
}

type Props = {
  children: ReactNode
  featureFlags: FeatureFlags
  spinner?: ReactNode
  fallback?: ReactNode
  logger?: {
    error(error: Error): void
  }
}

type State = {
  featureConfig: Features
  isInitialized: boolean
  requestIsFailed?: boolean
}

export class FeatureProvider extends Component<Props, State> {
  static defaultProps = {
    spinner: null,
    fallback: null,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      featureConfig: {},
      isInitialized: false,
    }

    window.Feature = {
      disableFeature: this.disableFeature,
      enableFeature: this.enableFeature,
      isEnabled: this.isEnabled,
    }
  }

  componentDidMount() {
    this.init()
  }

  public init = () => {
    const { featureFlags, logger } = this.props

    featureFlags.listen(this.onFeaturesChange)
    featureFlags
      .init()
      .then(() => this.setState({ isInitialized: true }))
      .catch(error => {
        logger && logger.error(new Error(`Feature flags init error: ${error ? error.message : ''}`))

        this.setState({ requestIsFailed: true })
      })
  }

  private onFeaturesChange = (featureConfig: Features) =>
    this.setState({
      featureConfig,
    })

  public disableFeature = (name: string) => this.props.featureFlags.disable(name)

  public enableFeature = (name: string) => this.props.featureFlags.enable(name)

  public isEnabled = (name: string) => this.props.featureFlags.isEnabled(name)

  public render() {
    const provider = (
      <FeatureContext.Provider value={{ isEnabled: this.isEnabled }}>
        {this.props.children}
      </FeatureContext.Provider>
    )
    const { isInitialized, requestIsFailed } = this.state
    const { spinner, fallback } = this.props

    if (isInitialized) return provider

    // in case of failed request and empty fallback all features will be either disabled
    // or enabled (according to `defaultValueForMissingKeys` option. False by default)
    if (requestIsFailed) return fallback ? fallback : provider

    return spinner
  }
}

type FeatureProps = {
  name: string
  children: ReactNode
  disabledElement: object
  logger?: {
    error: Error
  }
}

const FeatureDefaultProps = {
  children: null,
  disabledElement: null,
}

export const Feature = ({ name, children, disabledElement }: FeatureProps) => {
  return (
    <FeatureContext.Consumer>
      {({ isEnabled = () => false }) => (isEnabled(name) ? children : disabledElement)}
    </FeatureContext.Consumer>
  )
}

Feature.defaultProps = FeatureDefaultProps
