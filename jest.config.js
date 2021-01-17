module.exports = {
  roots: ['<rootDir>/src'],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "./coverage",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // A map from regular expressions to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // jest MongoDB provides all required configuration to run your tests using MongoDB.
  preset: "@shelf/jest-mongodb"

};
