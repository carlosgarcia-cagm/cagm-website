<template>
  <section id="education" class="py-16 px-6 bg-white/50 dark:bg-gray-900/50">
    <div class="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
      <div v-reveal>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {{ t('education.title') }}
        </h2>
        <ul class="space-y-4">
          <li
            v-for="item in education"
            :key="item.institution"
            class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {{ item.degree }}
            </h3>
            <p class="text-blue-600 dark:text-blue-400 font-medium">{{ item.institution }}</p>
            <p v-if="item.period" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ item.period }}</p>
            <p v-if="item.note" class="text-sm text-gray-600 dark:text-gray-300 mt-3">
              {{ item.note }}
            </p>
          </li>
        </ul>
      </div>

      <div v-reveal="120">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {{ t('languages.title') }}
        </h2>
        <ul
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li
            v-for="language in languages"
            :key="language.name"
            class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span class="font-medium text-gray-800 dark:text-gray-100">{{ language.name }}</span>
            <Chip variant="info">{{ language.level }}</Chip>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import Chip from '~/components/ui/Chip.vue'

const { t, tm, rt } = useI18n()

const education = computed(() =>
  (tm('education.items') as EducationItem[]).map(item => ({
    institution: rt(item.institution),
    degree: rt(item.degree),
    period: item.period != null ? rt(item.period as unknown as string) : undefined,
    note: item.note != null ? rt(item.note as unknown as string) : undefined
  }))
)
const languages = computed(() =>
  (tm('languages.items') as LanguageItem[]).map(item => ({
    name: rt(item.name),
    level: rt(item.level)
  }))
)
</script>
