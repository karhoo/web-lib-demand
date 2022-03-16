module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/base.d.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 86,
      lines: 90,
      statements: 90,
    },
  },
}
