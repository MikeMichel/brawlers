// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyD7RpczBMSDfyBXVsITyY_yY2KB6-x_qTk",
      authDomain: "speedy-valor-379408.firebaseapp.com",
      projectId: "speedy-valor-379408",
      storageBucket: "speedy-valor-379408.appspot.com",
      messagingSenderId: "153460609557",
      appId: "1:153460609557:web:97e2064be13fa69989f41c",
      measurementId: "G-KVLRV6N9Z1",
      // there could be other properties depending on the project
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    preset: "firebase",
  },
});
