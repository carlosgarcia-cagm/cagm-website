<template>
  <span class="relative inline-block">
    <!-- the real text keeps the final size, so nothing below moves while typing -->
    <span :class="{ invisible: typing }">{{ text }}</span>
    <span v-if="typing" class="absolute inset-0" aria-hidden="true">
      {{ typed }}<span class="type-caret" />
    </span>
  </span>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    text: string
    speed?: number
    /** when set, the text is typed only on the visitor's first visit */
    onceKey?: string
  }>(),
  { speed: 45, onceKey: undefined }
)

const typing = ref(false)
const typed = ref('')
let timer: ReturnType<typeof setInterval> | undefined

/** True the first time; later visits (same browser) show the text directly. */
function isFirstTime(key: string): boolean {
  try {
    if (localStorage.getItem(key)) return false
    localStorage.setItem(key, '1')
  } catch {
    // storage unavailable (private mode): just type
  }
  return true
}

onMounted(() => {
  if (prefersReducedMotion()) return
  if (props.onceKey && !isFirstTime(props.onceKey)) return
  typing.value = true
  let index = 0
  timer = setInterval(() => {
    index++
    typed.value = props.text.slice(0, index)
    if (index >= props.text.length) {
      clearInterval(timer)
      // leave the caret blinking briefly before showing the real text
      setTimeout(() => (typing.value = false), 600)
    }
  }, props.speed)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.type-caret {
  display: inline-block;
  width: 0.08em;
  height: 0.9em;
  margin-left: 0.05em;
  vertical-align: -0.05em;
  background: currentColor;
  animation: caret-blink 0.8s steps(1) infinite;
}

@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}
</style>
