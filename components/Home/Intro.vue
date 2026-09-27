<template>
  <section id="home" class="py-16 px-6 md:min-h-[60dvh] md:flex md:items-center">
    <div class="max-w-6xl mx-auto w-full">
      <div class="text-center">
        <div class="mb-8">
          <div class="logo-halo w-36 h-36 mx-auto rounded-full border-4 border-white dark:border-gray-700 p-2">
            <div
              class="w-full h-full rounded-full border-4 border-white dark:border-gray-700 bg-white flex items-center justify-center">
              <img
                src="/logo.png"
                alt=""
                width="112"
                height="112"
                class="w-28 h-28 rounded-full object-cover" />
            </div>
          </div>
        </div>
        <h1 class="mb-6">
          <span class="block text-xl md:text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
            {{ PROFILE.name }}
          </span>
          <span class="block text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100">
            <TypeWriter :key="locale" :text="t('home.title')" once-key="cagm:title-typed" />
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {{ t('home.description', { years }) }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            data-testid="cta-projects"
            class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {{ t('home.viewProjects') }}
          </a>
          <NuxtLink
            :to="localePath('/cv')"
            data-testid="cta-cv"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
            <Icon name="heroicons:document-text" size="20" aria-hidden="true" />
            {{ t('cv.view') }}
          </NuxtLink>
        </div>

        <ul class="mt-8 flex justify-center gap-4" data-testid="hero-social">
          <li v-for="link in socialLinks" :key="link.key">
            <a
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :aria-label="link.label"
              :title="link.label"
              class="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all">
              <Icon :name="link.icon" size="22" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import TypeWriter from '~/components/ui/TypeWriter.vue'
import { PROFILE, buildContactLinks, yearsOfExperience } from '~/utils/profile'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const years = yearsOfExperience()

const socialLinks = computed(() =>
  buildContactLinks(['linkedin', 'github', 'email'], (key) =>
    t(`footer.${key}`)
  )
)
</script>
