/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom — браузерное окружение (document, window) внутри Node.js
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
