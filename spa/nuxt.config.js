import tailwindcss from '@tailwindcss/vite'
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  ssr: true,

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000'
    }
  },

  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],

  modules: ['@primevue/nuxt-module'],

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    }
  },

  compatibilityDate: '2026-05-22'
})
