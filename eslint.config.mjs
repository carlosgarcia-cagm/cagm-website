// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // formatting is Prettier's job; this rule conflicts with it on void elements
    'vue/html-self-closing': 'off'
  }
})
