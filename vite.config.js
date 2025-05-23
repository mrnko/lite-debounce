import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/LiteDebounce.js'),
      name: 'LiteDebounce',
      formats: ['es'],
      fileName: () => 'lite-debounce.min.js',
    },
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      external: [],
      output: {},
    },
    emptyOutDir: true,
  },
  server: {
    open: '/demo/index.html',
  },
}); 