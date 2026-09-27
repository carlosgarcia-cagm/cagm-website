<template>
  <section id="skills" class="py-16 px-6 bg-white/50 dark:bg-gray-900/50">
    <div class="max-w-8xl mx-auto">
      <h2 class="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
        {{ t('skills.title') }}
      </h2>
      <ul
        class="flex justify-center gap-6 mb-12 text-sm text-gray-600 dark:text-gray-400"
        data-testid="skills-legend">
        <li class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 bg-green-500 rounded-full" aria-hidden="true"></span>
          {{ t('skills.legend.primary') }}
        </li>
        <li class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 bg-blue-500 rounded-full" aria-hidden="true"></span>
          {{ t('skills.legend.secondary') }}
        </li>
      </ul>

      <div class="flex flex-wrap gap-8 justify-center">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.id"
          v-reveal="(index % 3) * 100"
          class="w-full sm:w-auto">
          <SkillCard
            :title="category.title"
            :icon="category.icon"
            :gradient="category.gradient"
            :skills="category.skills"
            :legend="{ primary: t('skills.legend.primary'), secondary: t('skills.legend.secondary') }"
            class="h-full sm:min-w-sm" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import SkillCard from '~/components/ui/SkillCard.vue'

const { t, tm } = useI18n()

const skillCategories = computed(() =>
  tm('skills.categories') as SkillCategory[]
)
</script>
