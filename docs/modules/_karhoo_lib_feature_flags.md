[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/lib-feature-flags](_karhoo_lib_feature_flags.md)

# Module: @karhoo/lib-feature-flags

<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>Karhoo Lib Feature Flags</h1>

This library was created in order to have a possibility to enable/disable certain feature per environment without redeployment.

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```sh
npm i @karhoo/lib-feature-flags
```
## Warnings

This library uses `Promise`, `async/await` and other modern JS features so currently it works only in modern browsers by default. For old browsers you must run babel on it.

## Usage

### FeatureFlags

It takes config and has such functionality as enable/disable feature and isEnabled method that returns boolean for feature flag that is passed to it. By default it returns false if key is missing. This behavior can be changed by passing options to it.

### FeatureProvider

FeatureProvider is a provider of FeatureFlags. Use it in your App component so that every component can use this functionality.

Feature component could be used for every feature that you want to have a possibility to enable/disable. Example of usage:

`
<Feature name="pageLogo">
  <PageLogo />
</Feature>
`

### ObjectConfig

It can be used if you want to use simple object as a config for feature toggling. It takes config and environment so different configs could be used per different environments.

## Issues

_Looking to contribute?_

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior with a label `FEATURE_FLAGS`

### 💡 Feature Requests

Please file an issue to suggest new features with a label `FEATURE_FLAGS`. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

### ❓ Questions

For questions related to using the library, please re-visit a documentation first. If there are no answer, please create an issue with a label `help needed` and `FEATURE_FLAGS`.

## Contributing

### License

[BSD-2-Clause](../LICENSE)
