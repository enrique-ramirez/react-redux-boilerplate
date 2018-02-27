module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/app.js',
    '!src/utils/intl-enzyme.js',
  ],
  coverageDirectory: './coverage',
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
  },
  setupTestFrameworkScriptFile: './config/setupTests',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
}
