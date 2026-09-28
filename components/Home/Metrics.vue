<template>
  <section aria-label="Metrics" class="py-12 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <dl class="grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="hero-metrics">
        <div
          v-for="(metric, index) in metrics"
          :key="metric.label"
          v-reveal="index * 100"
          class="flex flex-col items-center text-center gap-1">
          <dd class="text-4xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
            <CountUp :value="rt(metric.value, { years })" />
          </dd>
          <dt class="text-sm text-gray-500 dark:text-gray-400 leading-snug">{{ rt(metric.label) }}</dt>
        </div>
      </dl>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import CountUp from '~/components/ui/CountUp.vue'
import { yearsOfExperience } from '~/utils/profile'

const { tm, rt } = useI18n()

const years = yearsOfExperience()
const metrics = computed(() => tm('home.metrics') as HeroMetric[])
</script>
