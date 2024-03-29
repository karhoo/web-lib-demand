module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/base.d.ts'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },
}
