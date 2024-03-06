import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [ react() ],
  build: {
    target: "esnext",
    rollupOptions: {
      external: [
        'react',
        'react-dom/client'
      ],
      output: {
        entryFileNames: 'main.js',
        assetFileNames: 'style.css',
        paths: {
          'react': 'ef-react',
          'react-dom/client': 'ef-react-dom/client',
        }
      }
    } 
  }
})
