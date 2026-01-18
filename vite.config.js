import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Default configuration assumes index.html is the entry point
  build: {
    target: 'esnext'
  }
});