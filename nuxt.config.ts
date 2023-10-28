// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-snackbar",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore",
        ],
      },
    ],
  ],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },
  googleFonts: {
    display: "swap", // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
    families: {
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
  runtimeConfig: {
    public: {
      secret: process.env.SECRET,
    },
  },
});
