<template>
  <div class="min-h-screen bg-gray-200 dark:bg-gray-950 print:bg-white">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-800 focus:rounded-lg focus:shadow">
      {{ t('nav.skipToContent') }}
    </a>
    <Header />
    <main id="main" class="pt-16 print:pt-0">
      <NuxtPage />
    </main>
    <Footer />
    <!-- loaded (and downloaded) only when the backend confirms it can answer -->
    <LazyChatWidget v-if="isChatAvailable" />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import Footer from './components/footer/Footer.vue'
import Header from './components/header/Header.vue'
import { SITE_URL, THEME_STORAGE_KEY, buildPersonJsonLd } from './utils/profile'

const { locale, t, tm } = useI18n()

// hreflang alternates, canonical, og:locale and og:url
const i18nHead = useLocaleHead({ seo: true })

const isChatAvailable = ref(false)
onMounted(async () => {
  try {
    const status = await $fetch<{ available: boolean }>('/api/chat/status')
    isChatAvailable.value = status.available
  } catch {
    isChatAvailable.value = false
  }
})

const skills = computed(() =>
  (tm('skills.categories') as SkillCategory[]).flatMap((category) =>
    category.skills.map((skill) => skill.name)
  )
)

const ogImage = `${SITE_URL}/og-image.png`

const THEME_SCRIPT = `(function () {
  try {
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}')
    var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  } catch (e) {}
})()`

useHead(() => ({
  title: t('website.title'),
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('website.description') },
    { name: 'keywords', content: t('website.keywords') },
    { name: 'color-scheme', content: 'light dark' },
    { property: 'og:type', content: 'profile' },
    { property: 'og:title', content: t('website.title') },
    { property: 'og:description', content: t('website.description') },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('website.title') },
    { name: 'twitter:description', content: t('website.description') },
    { name: 'twitter:image', content: ogImage },
    ...(i18nHead.value.meta || [])
  ],
  script: [
    {
      // apply the saved theme (or the system one) before the page is painted
      key: 'theme',
      innerHTML: THEME_SCRIPT
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        buildPersonJsonLd({
          locale: locale.value,
          jobTitle: t('home.title'),
          description: t('website.description'),
          skills: skills.value
        })
      )
    }
  ]
}))
</script>
