import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    minify: true
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    lib: {
      entry: 'src/index.tsx',
      name: 'React-Pin-Component',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React'
        }
      }
    }
  }
  
})