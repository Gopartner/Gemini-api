import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const assetsPath = path.resolve(__dirname, 'src/assets/images');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@a': path.resolve(__dirname, 'src/components/atoms'),
      '@b': path.resolve(__dirname, 'src/components/blog'),
      '@c': path.resolve(__dirname, 'src/components'),
      '@m': path.resolve(__dirname, 'src/components/molecules'),
      '@o': path.resolve(__dirname, 'src/components/organisms'),
      '@p': path.resolve(__dirname, 'src/components/pages'),
      '@f': path.resolve(__dirname, 'src/config'),
      '@h': path.resolve(__dirname, 'src/hooks'),
      '@u': path.resolve(__dirname, 'src/utils'),
      '@images': assetsPath,
    },
  },
});
