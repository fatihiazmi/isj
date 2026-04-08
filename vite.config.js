import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        misi1: resolve(__dirname, 'misi1.html'),
        sebutan: resolve(__dirname, 'sebutan.html'),
        tracing: resolve(__dirname, 'tracing.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
      },
    },
  },
})
