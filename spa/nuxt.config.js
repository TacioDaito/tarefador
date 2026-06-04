import tailwindcss from '@tailwindcss/vite'
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  },

  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],

  modules: ['@primevue/nuxt-module', 'nuxt-auth-sanctum'],

  sanctum: {
    baseUrl: process.env.NUXT_PUBLIC_API_URL,
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/login',
      logout: '/logout',
      user: '/user'
    },
    redirect: {
      keepRequestedRoute: true,
      onLogin: '/dashboard',
      onLogout: '/login',
      onAuthOnly: '/login',
      onGuestOnly: '/dashboard'
    }
  },

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
      hmr: true,
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/.nuxt/**', '**/node_modules/**']
      }
    },
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
    }
  },

  compatibilityDate: '2026-05-22'
})
