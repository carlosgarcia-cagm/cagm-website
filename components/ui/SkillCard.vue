<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 dark:border-gray-700">
    <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
      {{ title }}
    </h3>

    <div class="flex items-center gap-8">
      <div
        :class="`w-16 h-16 shrink-0 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`">
        <Icon :name="icon" size="32" class="text-white" aria-hidden="true" />
      </div>

      <ul class="space-y-2">
        <li
          v-for="skill in skills"
          :key="skill.name"
          class="flex items-center space-x-3">
          <span
            :class="`w-2 h-2 ${LEVEL_COLORS[skill.level]} rounded-full`"
            :title="legend[skill.level]"
            aria-hidden="true"></span>
          <span class="text-gray-600 dark:text-gray-300">
            {{ skill.name }}
            <span class="sr-only">({{ legend[skill.level] }})</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  icon: string
  gradient: string
  skills: SkillCardSkill[]
  legend: Record<SkillCardSkill['level'], string>
}

defineProps<Props>()

const LEVEL_COLORS: Record<SkillCardSkill['level'], string> = {
  primary: 'bg-green-500',
  secondary: 'bg-blue-500'
}
</script>
