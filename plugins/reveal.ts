import type { Directive } from 'vue'

/**
 * v-reveal: fades an element in when it scrolls into view. The value is an
 * optional delay in ms to stagger lists.
 *
 * Content is never hidden on the server or without JavaScript: only elements
 * that start below the fold are hidden (`reveal-pending`) until they appear.
 * Every element gets `is-revealed` once visible, which other styles (the
 * timeline) use to start their own animations.
 */
const reveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    const show = () => {
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      el.classList.remove('reveal-pending')
      el.classList.add('is-revealed')
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show()
      return
    }

    el.classList.add('reveal-pending')
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
  },
  unmounted(el) {
    ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver?.disconnect()
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
