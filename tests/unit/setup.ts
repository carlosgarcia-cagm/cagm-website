// Nuxt auto-imports this macro at build time; in plain Vitest it is an
// identity function so nuxt.config can be imported directly.
Object.assign(globalThis, {
  defineNuxtConfig: <T>(config: T) => config
})
