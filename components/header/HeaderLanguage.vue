<template>
  <NuxtLink
    :to="switchLocalePath(otherLocale)"
    :hreflang="otherLocale"
    :lang="otherLocale"
    :aria-label="t('nav.switchLanguage')"
    :title="t('nav.switchLanguage')"
    data-testid="language-switch"
    class="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-dark text-white text-sm font-semibold transition-colors">
    {{ otherLocale.toUpperCase() }}
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))
</script>
