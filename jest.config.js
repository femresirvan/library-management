module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'tests',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
