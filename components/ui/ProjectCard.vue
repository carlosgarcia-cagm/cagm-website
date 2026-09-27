<template>
  <article
    class="relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 dark:border-gray-700">
    <div class="flex items-center mb-4">
      <div
        v-if="project.logo"
        class="w-12 h-12 rounded-lg overflow-hidden mr-4">
        <img
          :src="project.logo"
          :alt="`${project.title} logo`"
          class="w-full h-full object-cover" />
      </div>
      <div
        v-else
        class="w-12 h-12 shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
        <Icon name="heroicons:beaker" size="24" class="text-white" aria-hidden="true" />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          {{ project.title }}
        </h3>
        <Chip :variant="project.isPublic ? 'success' : 'warning'">
          {{
            project.isPublic
              ? t('projects.visibilityPublic')
              : t('projects.visibilityPrivate')
          }}
        </Chip>
      </div>
    </div>

    <div class="mb-4">
      <p
        :id="descriptionId"
        ref="descriptionRef"
        class="text-gray-600 dark:text-gray-300 text-sm"
        :class="{ 'line-clamp-3': !isExpanded }">
        {{ project.description }}
      </p>
      <button
        v-if="isTruncated || isExpanded"
        type="button"
        class="mt-1 text-sm font-medium text-primary-600 dark:text-accent hover:underline"
        :aria-expanded="isExpanded"
        :aria-controls="descriptionId"
        data-testid="project-toggle"
        @click="isExpanded = !isExpanded">
        {{ isExpanded ? t('projects.showLess') : t('projects.showMore') }}
      </button>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <Chip
        v-for="tech in project.technologies"
        :key="tech"
        rounded="md">
        {{ tech }}
      </Chip>
    </div>

    <div class="flex items-center justify-between mt-auto">
      <a
        v-if="project.projectUrl"
        :href="project.projectUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors duration-200">
        <Icon name="heroicons:arrow-top-right-on-square" size="16" aria-hidden="true" />
        {{ t('projects.viewProject') }}
      </a>

      <div
        v-if="project.githubRepos && project.githubRepos.length > 0"
        ref="dropdownRef"
        class="relative">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200"
          :aria-expanded="isDropdownOpen"
          @click="isDropdownOpen = !isDropdownOpen">
          <Icon name="simple-icons:github" size="16" aria-hidden="true" />
          GitHub
          <Icon
            name="heroicons:chevron-down"
            size="16"
            :class="{ 'rotate-180': isDropdownOpen }"
            aria-hidden="true" />
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100]">
          <div class="py-1">
            <a
              v-for="repo in project.githubRepos"
              :key="repo.url"
              :href="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
              {{ repo.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { Project } from '~/composables/useProjects'

import Chip from './Chip.vue'

const props = defineProps<{ project: Project }>()

const { t } = useI18n()

const descriptionId = `project-description-${props.project.id}`
const descriptionRef = ref<HTMLElement>()
const isExpanded = ref(false)
const isTruncated = ref(false)

const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

// "Show more" is only offered when the clamped text actually overflows
function measureTruncation() {
  const el = descriptionRef.value
  if (el && !isExpanded.value) {
    isTruncated.value = el.scrollHeight > el.clientHeight + 1
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  measureTruncation()
  window.addEventListener('resize', measureTruncation)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', measureTruncation)
  document.removeEventListener('click', handleClickOutside)
})
</script>
