export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  srcDir: './src',
  generate: {
    fallback: '404.html',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Desafio faster',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  server: {
    port: 3001, // Especifique a porta desejada, por exemplo, 3001
    host: '0.0.0.0', // Permite acesso de qualquer endereço IP
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts',

  ],
  googleFonts: {
    families: {
      Lora: true,
      'Bodoni+Moda': true,

    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.resolve.extensions.push('.ts', '.js', '.vue', '.json');
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom-404',
        path: '*',
        component: resolve(__dirname, 'src/pages/Error.vue')
      });
      routes.push({
        name: 'login',
        path: '/',
        component: resolve(__dirname, 'src/pages/Login.vue')
      });
      routes.push({
        name: 'register',
        path: '/register',
        component: resolve(__dirname, 'src/pages/Register.vue'),
      });
      routes.push({
        name: 'products',
        path: '/products',
        component: resolve(__dirname, 'src/pages/Products.vue'),
      });
      routes.push({
        name: 'drink-details',
        path: '/drink-details/:id',
        component: resolve(__dirname, 'src/pages/DrinksDetails.vue'),
      });
      routes.push({
        name: 'liked-drinks',
        path: '/liked-drinks',
        component: resolve(__dirname, 'src/pages/LikedDrinks.vue'),
      });
    }
  },
  
}
