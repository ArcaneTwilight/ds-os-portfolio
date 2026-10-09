import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, 'POSTHOG_');

  return {
    base: './',
    envPrefix: [],
    define: {
      'import.meta.env.POSTHOG_KEY': JSON.stringify(env.POSTHOG_KEY ?? ''),
      'import.meta.env.POSTHOG_HOST': JSON.stringify(env.POSTHOG_HOST ?? ''),
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
