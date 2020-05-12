module.exports = {
  testURL: 'http://localhost:9999/test',
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: ['src/**/*.js'],
  projects: ['<rootDir>'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js'],
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>.jest/setupTests.js'],
}
