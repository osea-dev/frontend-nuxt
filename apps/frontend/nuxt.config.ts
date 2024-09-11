// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore'
        ]
      }
    ]
  ]
})
