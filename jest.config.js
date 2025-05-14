// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$'
    }
  },
  transform: {
    '^.+\\.(ts|mjs|html|js)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(scss|sass|css|less)$': 'identity-obj-proxy',
    '\\.html$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs|tslib)/)',
  ],
};
