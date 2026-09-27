<template>
  <span ref="el" class="tabular-nums">{{ display }}</span>
</template>

<script lang="ts" setup>
import { formatCount, parseCount } from '~/utils/count'

const props = withDefaults(defineProps<{ value: string; duration?: number }>(), {
  duration: 1200
})

// the server renders the final value (SEO, no JavaScript); the browser counts up
const display = ref(props.value)
const el = ref<HTMLElement>()
let observer: IntersectionObserver | undefined
let frame = 0

function animate(target: number, suffix: string) {
  const start = performance.now()
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - progress, 3)
    display.value = formatCount(Math.round(target * eased), suffix)
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  const parsed = parseCount(props.value)
  if (!parsed || prefersReducedMotion() || !el.value) return

  display.value = formatCount(0, parsed.suffix)
  observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer?.disconnect()
      animate(parsed.target, parsed.suffix)
    }
  })
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>
