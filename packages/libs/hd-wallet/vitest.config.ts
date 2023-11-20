import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    threads: false, // To prevent error in tests using jsdom environment: Module did not self-register: canvas.node
    setupFiles: './vitest.setup.js',
  },
});
