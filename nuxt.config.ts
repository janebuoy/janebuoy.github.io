// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode'
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
  runtimeConfig: {
    public: {
      openreplayProjectKey: process.env.NUXT_PUBLIC_OPENREPLAY_PROJECT_KEY
    }
  },
  plugins: [
    './utils/tracker.js'
  ],
  nitro: {
    prerender: {
      routes: ['/words/feed', '/words/json', '/words/atom'],
    },
  },
  content: {
    documentDriven: false,
    highlight: {
      preload: ['diff', 'go', 'json', 'js', 'ts', 'css', 'shell', 'html', 'md', 'yaml'],
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      }
    }
  },
	colorMode: {
		classSuffix: ''
	}
})