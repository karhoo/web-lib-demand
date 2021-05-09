module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', 'testMocks*', 'src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
