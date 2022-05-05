module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src', 'node_modules'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
