// eslint-disable-next-line no-unused-vars
import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'

export const FeatureContext = createContext({})

export class FeatureProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    feature: PropTypes.shape({
      disable: PropTypes.func.isRequired,
      enable: PropTypes.func.isRequired,
      init: PropTypes.func.isRequired,
    }),
    spinner: PropTypes.node,
    fallback: PropTypes.node,
  }

  static defaultProps = {
    spinner: null,
    fallback: null,
  }

  constructor(props) {
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

  init = () => {
    const { feature, logger } = this.props

    feature.listen(this.onFeaturesChange)
    feature
      .init()
      .then(() => this.setState({ isInitialized: true }))
      .catch(error => {
        logger && logger.error(new Error(`Feature flags init error: ${error ? error.message : ''}`))

        this.setState({ requestIsFailed: true })
      })
  }

  onFeaturesChange = featureConfig =>
    this.setState({
      featureConfig,
    })

  disableFeature = name => this.props.feature.disable(name)

  enableFeature = name => this.props.feature.enable(name)

  isEnabled = name => this.props.feature.isEnabled(name)

  render() {
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

export const Feature = ({ name, children, disabledElement }) => {
  return (
    <FeatureContext.Consumer>
      {({ isEnabled }) => (isEnabled(name) ? children : disabledElement)}
    </FeatureContext.Consumer>
  )
}

Feature.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  disabledElement: PropTypes.object,
  logger: PropTypes.shape({
    error: PropTypes.func.isRequired,
  }),
}

Feature.defaultProps = {
  children: null,
  disabledElement: null,
}
