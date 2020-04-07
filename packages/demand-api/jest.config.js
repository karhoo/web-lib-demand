module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'src/testMocks*'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
