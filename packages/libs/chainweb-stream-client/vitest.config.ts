import baseConfig  from '@kadena-dev/shared-config/vitest.config';
import { defineConfig, mergeConfig } from 'vitest/config';

const localConfig = defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 92.21,
        functions: 60,
        branches: 80,
        statements: 92.21,
        autoUpdate: true,
      },
    },
  },
});

export default mergeConfig(baseConfig, localConfig);
