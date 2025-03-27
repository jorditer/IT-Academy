import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(),     svgr({
    include: '**/*.svg?react',
    svgrOptions: {
      exportType: 'named',
      ref: true,
      svgo: false,
      titleProp: true,
    },
  }),],
  // root: '../', // Ensure this is correct
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});