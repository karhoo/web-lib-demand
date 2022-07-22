module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 63,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
}
