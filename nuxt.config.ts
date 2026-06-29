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