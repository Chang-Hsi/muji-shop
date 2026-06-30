export default defineNuxtConfig({
  compatibilityDate: '2026-06-29',

  devtools: {
    enabled: true
  },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxt/icon'
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    }
  },

  app: {
    head: {
      title: 'Minimal Shop',
      meta: [
        {
          name: 'description',
          content: '簡潔風格電商網站'
        }
      ]
    }
  }
})
