/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/frontend-app',
  server: {
    port: 4200,
    host: 'localhost',
    hmr: {
      overlay: true // this should be true (default)
    }
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  build: {
    outDir: '../dist/frontend-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
