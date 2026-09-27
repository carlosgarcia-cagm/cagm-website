<template>
  <footer id="contact" class="print:hidden bg-gray-900 dark:bg-black text-white py-8">
    <div class="max-w-6xl mx-auto px-6">
      <ul
        class="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-6"
        data-testid="footer-links">
        <li v-for="link in contactLinks" :key="link.key">
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
            :aria-label="link.label"
            :title="link.label">
            <Icon :name="link.icon" size="24" aria-hidden="true" />
          </a>
        </li>
      </ul>

      <div class="text-center text-gray-400 text-sm">
        © {{ currentYear }} {{ PROFILE.name }}. {{ t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { PROFILE, buildContactLinks } from '~/utils/profile'

const { t } = useI18n()

const currentYear = new Date().getFullYear()

const contactLinks = computed(() =>
  buildContactLinks(['linkedin', 'github', 'email', 'whatsapp', 'telegram'], (key) =>
    t(`footer.${key}`)
  )
)
</script>
