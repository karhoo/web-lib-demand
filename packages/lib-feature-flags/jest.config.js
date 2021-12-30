module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 38,
      functions: 50,
      lines: 65,
      statements: 60,
    },
  },
  setupFiles: ['./src/setupTest.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
