<template>
  <article
    class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 dark:border-gray-700">
    <header class="mb-4">
      <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{{ company }}</h3>
      <p class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{{ position }}</p>
      <p class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <Icon name="heroicons:map-pin" size="16" aria-hidden="true" />
        {{ location }}
      </p>
    </header>

    <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{{ description }}</p>

    <div v-if="achievements.length" class="mb-4">
      <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {{ t('timeline.achievementsLabel') }}:
      </h4>
      <ul class="space-y-2">
        <li
          v-for="(achievement, index) in achievements"
          :key="index"
          class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span
            class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"
            aria-hidden="true"></span>
          <span>{{ achievement }}</span>
        </li>
      </ul>
    </div>

    <div v-if="projects.length" class="mb-4">
      <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {{ t('timeline.projectsLabel') }}:
      </h4>
      <div class="space-y-3">
        <div
          v-for="project in projects"
          :key="project.name"
          class="bg-gray-50 dark:bg-gray-900/60 rounded-lg p-3">
          <h5 class="font-medium text-gray-800 dark:text-gray-100 text-sm">
            {{ project.name }} ({{ project.period }})
          </h5>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ project.description }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-1.5">
      <Chip v-for="tech in technologies" :key="tech" variant="info" size="sm">
        {{ tech }}
      </Chip>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import Chip from './Chip.vue'

interface Props {
  company: string
  position: string
  location: string
  description: string
  achievements: string[]
  projects: TimelineProject[]
  technologies: string[]
}

defineProps<Props>()

const { t } = useI18n()
</script>
