<template>
  <header
    class="print:hidden fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md dark:shadow-black/30">
    <div
      class="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between gap-4">
      <HeaderTitle />

      <nav
        :aria-label="t('nav.mainNavigation')"
        class="hidden md:flex items-center gap-6">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <HeaderLanguage />
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          data-testid="menu-toggle"
          @click="isMenuOpen = !isMenuOpen">
          <Icon
            :name="
              isMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'
            "
            size="24"
            aria-hidden="true" />
        </button>
      </div>
    </div>

    <nav
      v-if="isMenuOpen"
      id="mobile-menu"
      :aria-label="t('nav.mainNavigation')"
      class="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="item.href"
        class="block py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        @click="isMenuOpen = false">
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import HeaderLanguage from './HeaderLanguage.vue'
import HeaderTitle from './HeaderTitle.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useI18n()

const localePath = useLocalePath()

const isMenuOpen = ref(false)

const navItems = computed(() => {
  const home = localePath('/')
  const section = (id: string) => ({ id, href: `${home}#${id}`, label: t(`nav.${id}`) })
  return [
    section('skills'),
    section('experience'),
    section('projects'),
    section('education'),
    { id: 'cv', href: localePath('/cv'), label: t('nav.cv') },
    section('contact')
  ]
})
</script>
