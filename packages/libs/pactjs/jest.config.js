const sharedConfig = require('@kadena-dev/heft-rig/profiles/default/config/jest.config.json');

module.exports = {
  ...sharedConfig,
  moduleNameMapper: {
    // '@/(.*)': '<rootDir>/src/$1',
    // '@components/(.*)': '<rootDir>/src/components/$1',
    // '@theme/(.*)': '<rootDir>/src/styles/$1',
  },
};
