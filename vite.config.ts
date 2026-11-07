import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
          compilerOptions: {
              isCustomElement: tag => tag.startsWith("ui_")
          }
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL("./shared-types", import.meta.url)),
      
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})