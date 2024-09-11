// https://nuxt.com/docs/api/configuration/nuxt-config


import { DEFAULT_LOCALE, LOCALES } from './config/i18n'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
		'@/*': `./*`,
	},

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
  ],
  i18n: {
		defaultLocale: DEFAULT_LOCALE,
		locales: LOCALES,
		langDir: 'locales/',
	},
})
