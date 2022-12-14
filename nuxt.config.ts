// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['author'].includes(tag)
    }
  },
  content: {
    documentDriven: true
  }
})

