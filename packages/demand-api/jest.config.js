module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'testMocks*', 'src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
}
