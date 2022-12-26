// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
	app: {
			head: {
					link: [{ rel: 'icon', type: 'image/png', href: '/favicon/favicon-32x32.png' }]
			},
	},
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['author'].includes(tag)
    }
  },
  content: {
    documentDriven: true
  }
})