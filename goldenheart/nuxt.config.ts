export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      'Playfair Display': { wght: [500, 600, 700], ital: [400] },
      'Plus Jakarta Sans': { wght: [400, 500, 600, 700] },
    },
    display: 'swap',
  },
  site: { url: 'https://goldenheartcollege.sch.ng', name: 'Goldenheart College' },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_ANON_KEY || '',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/logo.jpg' },
      ],
      meta: [{ name: 'theme-color', content: '#8B1A1A' }],
    },
  },
})
