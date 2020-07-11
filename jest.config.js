module.exports = {
  collectCoverageFrom: ["src/**/*.spec.{ts,tsx}", "!<rootDir>/node_modules/"],
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
