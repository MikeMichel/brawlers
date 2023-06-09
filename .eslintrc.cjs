module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "vue/custom-event-name-casing": [
      "off",
      "camelCase" || "kebab-case",
      {
        ignores: [],
      },
    ],
    "vue/v-on-event-hyphenation": [
      "off",
      {
        autofix: true,
        ignore: [],
      },
    ],
    "prettier/prettier": ["error"],
  },
};
