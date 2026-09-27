<template>
  <section id="experience" class="py-16 px-6 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
        {{ t('timeline.title') }}
      </h2>

      <ol data-testid="timeline">
        <li
          v-for="experience in experiences"
          :key="experience.company"
          v-reveal
          class="md:grid md:grid-cols-[11rem_1fr] md:gap-8">
          <!-- desktop: dates on the left of the line -->
          <div class="hidden md:block text-right pt-6">
            <p class="font-semibold text-primary-600 dark:text-accent">
              {{ experience.period }}
            </p>
            <Chip :variant="WORK_MODE_VARIANTS[experience.workMode]" class="mt-2">
              {{ t(`timeline.workModes.${experience.workMode}`) }}
            </Chip>
          </div>

          <div
            class="timeline-track relative border-l-2 border-gray-200 dark:border-gray-700 pl-6 md:pl-8 pb-12">
            <span
              class="timeline-dot absolute -left-[9px] top-7 w-4 h-4 rounded-full bg-primary ring-4 ring-gray-50 dark:ring-gray-900"
              :class="{ 'is-current': experience.current }"
              aria-hidden="true"></span>

            <!-- mobile: dates above the card -->
            <div class="md:hidden flex flex-wrap items-center gap-2 mb-3">
              <p class="font-semibold text-primary-600 dark:text-accent">
                {{ experience.period }}
              </p>
              <Chip :variant="WORK_MODE_VARIANTS[experience.workMode]">
                {{ t(`timeline.workModes.${experience.workMode}`) }}
              </Chip>
            </div>

            <TimelineCard
              :company="experience.company"
              :position="experience.position"
              :location="experience.location"
              :description="experience.description"
              :achievements="experience.achievements"
              :projects="experience.projects"
              :technologies="experience.technologies" />
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import Chip from '~/components/ui/Chip.vue'
import TimelineCard from '~/components/ui/TimelineCard.vue'

const { t, tm, rt } = useI18n()

const WORK_MODE_VARIANTS = {
  remote: 'success',
  onsite: 'info',
  hybrid: 'warning'
} as const

const experiences = computed(() =>
  (tm('timeline.experiences') as TimelineExperience[]).map(exp => ({
    company: rt(exp.company),
    current: exp.current,
    position: rt(exp.position),
    location: rt(exp.location),
    workMode: rt(exp.workMode) as TimelineExperience['workMode'],
    period: rt(exp.period),
    description: rt(exp.description),
    achievements: (exp.achievements as unknown[]).map(a => rt(a as string)),
    projects: (exp.projects as TimelineProject[]).map(p => ({
      name: rt(p.name),
      period: rt(p.period),
      description: rt(p.description)
    })),
    technologies: (exp.technologies as unknown[]).map(tech => rt(tech as string))
  }))
)
</script>

<style scoped>
/* the line ends at the last card instead of running past it */
li:last-child .timeline-track {
  padding-bottom: 0;
}

/* blue line drawn over the grey track; it fills as each role scrolls in */
.timeline-track::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -2px;
  width: 2px;
  background: var(--color-primary-600);
  transform-origin: top;
  transition: transform 0.9s ease-out;
}

.reveal-pending .timeline-track::before {
  transform: scaleY(0);
}

.timeline-dot {
  z-index: 1;
  transition:
    background-color 0.4s,
    transform 0.4s;
}

.reveal-pending .timeline-dot {
  background-color: rgb(209 213 219);
  transform: scale(0.6);
}

.is-revealed .timeline-dot {
  animation: dot-pop 0.5s ease-out;
}

/* the role in progress keeps a soft pulse */
.timeline-dot.is-current::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 2px solid color-mix(in srgb, var(--color-primary-600) 70%, transparent);
  animation: dot-pulse 2s ease-out infinite;
}

@keyframes dot-pop {
  0% {
    transform: scale(0.6);
  }
  60% {
    transform: scale(1.35);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes dot-pulse {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(2.2);
    opacity: 0;
  }
}
</style>
