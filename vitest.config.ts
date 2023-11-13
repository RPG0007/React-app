///<reference types="vitest" />
///<reference types="vite/client" />

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/main.tsx',
        'src/types/interfaces.ts',
        'src/vite-env.d.ts ',
      ],
      include: ['src'],
    },
    globals: true,
    environment: 'jsdom',
  },
});
