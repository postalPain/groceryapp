import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // 👇  a picomatch-style glob, RegExp, or array of globs
      ignored: [
        // ignore an entire directory
        '**/mock-server/**/*.*'
      ]
    }
  }
})
