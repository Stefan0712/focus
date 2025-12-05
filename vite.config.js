import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  base: "/get-it-done",
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 3002,
  },
});