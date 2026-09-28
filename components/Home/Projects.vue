<template>
  <section id="projects" class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('projects.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('projects.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          v-reveal="(index % 3) * 100"
          class="h-full">
          <ProjectCard :project="project" class="h-full" />
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ t('projects.CTA') }}
        </p>
        <a
          :href="`mailto:${PROFILE.email}`"
          class="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-colors duration-200">
          <Icon name="material-symbols:mail-outline" size="20" aria-hidden="true" />
          {{ t('home.contactMe') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import ProjectCard from '~/components/ui/ProjectCard.vue'
import { PROFILE } from '~/utils/profile'

const { projects } = useProjects()
const { t } = useI18n()
</script>
