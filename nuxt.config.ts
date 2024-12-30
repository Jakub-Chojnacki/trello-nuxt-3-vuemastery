// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:['~/assets/css/vello.css'],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/ui", "@vueuse/nuxt"],
  colorMode: {
    preference: "light",
  },
  ssr:false,
});