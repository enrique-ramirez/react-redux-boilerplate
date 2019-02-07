module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/app.js',
    '!src/utils/intl-enzyme.js',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      branches: 91,
      functions: 98,
      lines: 98,
      statements: 98,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^.+\\.(css)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif)$': '<rootDir>/config/mocks/fileMock.js',
  },
  rootDir: '../../',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests'],
  verbose: true,
}
