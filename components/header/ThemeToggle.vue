<template>
  <button
    type="button"
    class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    :aria-label="t('nav.toggleTheme')"
    :title="t('nav.toggleTheme')"
    :aria-pressed="isDark"
    data-testid="theme-toggle"
    @click="setTheme(!isDark, true)">
    <!-- icons follow the <html> class, so they are right before hydration too -->
    <!-- wrappers: the icon's own display style would override `hidden` -->
    <span class="inline-flex dark:hidden" data-testid="theme-icon-moon">
      <Icon name="heroicons:moon" size="20" aria-hidden="true" />
    </span>
    <span class="hidden dark:inline-flex" data-testid="theme-icon-sun">
      <Icon name="heroicons:sun" size="20" aria-hidden="true" />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { THEME_STORAGE_KEY } from '~/utils/profile'

const { t } = useI18n()
const isDark = ref(false)

function setTheme(dark: boolean, remember: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  isDark.value = dark
  if (remember) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light')
    } catch {
      // storage unavailable: the choice lasts until the page is reloaded
    }
  }
}

function hasSavedTheme() {
  try {
    return Boolean(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return false
  }
}

const systemDark = import.meta.client ? matchMedia('(prefers-color-scheme: dark)') : undefined
// without a saved choice, keep following the system setting
const onSystemChange = (event: MediaQueryListEvent) => {
  if (!hasSavedTheme()) setTheme(event.matches, false)
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  systemDark?.addEventListener('change', onSystemChange)
})

onBeforeUnmount(() => systemDark?.removeEventListener('change', onSystemChange))
</script>
