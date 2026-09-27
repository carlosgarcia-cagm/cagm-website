<template>
  <div class="pb-8 min-h-[calc(100dvh-4rem)] print:p-0 print:min-h-0">
    <div
      class="sm:sticky top-16 z-30 px-4 py-3 mb-4 bg-gray-200/90 dark:bg-gray-950/90 backdrop-blur print:hidden"
      data-testid="cv-toolbar">
      <div class="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-accent">
          <Icon name="heroicons:arrow-left" size="16" aria-hidden="true" />
          {{ t('cv.back') }}
        </NuxtLink>

        <div class="flex flex-wrap items-center gap-2">
          <div
            class="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            role="group"
            :aria-label="t('cv.zoomLevel')">
            <button
              type="button"
              class="inline-flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
              :aria-label="t('cv.zoomOut')"
              :title="t('cv.zoomOut')"
              :disabled="scale <= MIN_ZOOM"
              data-testid="cv-zoom-out"
              @click="zoom('out')">
              <Icon name="heroicons:magnifying-glass-minus" size="18" aria-hidden="true" />
            </button>
            <span
              class="w-14 text-center text-sm tabular-nums text-gray-700 dark:text-gray-200"
              aria-live="polite"
              data-testid="cv-zoom-level">
              {{ Math.round(scale * 100) }}%
            </span>
            <button
              type="button"
              class="inline-flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
              :aria-label="t('cv.zoomIn')"
              :title="t('cv.zoomIn')"
              :disabled="scale >= MAX_ZOOM"
              data-testid="cv-zoom-in"
              @click="zoom('in')">
              <Icon name="heroicons:magnifying-glass-plus" size="18" aria-hidden="true" />
            </button>
          </div>

          <!-- only useful when the screen is narrower than the page -->
          <button
            type="button"
            class="cv-fit-toggle inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-primary-600 dark:hover:border-accent"
            data-testid="cv-fit-toggle"
            @click="toggleFit">
            <Icon
              :name="mode === 'fit' ? 'heroicons:arrows-pointing-out' : 'heroicons:arrows-pointing-in'"
              size="18"
              aria-hidden="true" />
            {{ mode === 'fit' ? t('cv.actualSize') : t('cv.fitWidth') }}
          </button>

          <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-primary-600 dark:hover:border-accent" @click="print">
            <Icon name="heroicons:printer" size="18" aria-hidden="true" />
            <span class="hidden sm:inline">{{ t('cv.print') }}</span>
            <span class="sr-only sm:hidden">{{ t('cv.print') }}</span>
          </button>
          <a
            :href="cvDownloadPath(locale)"
            download
            data-testid="cv-download"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-dark text-white text-sm font-medium">
            <Icon name="material-symbols:download" size="18" aria-hidden="true" />
            {{ t('cv.download') }}
          </a>
        </div>
      </div>
    </div>

    <!-- scrolls on its own when the page is larger than the screen -->
    <div ref="viewportRef" class="cv-viewport" data-testid="cv-viewport">
      <div
        class="cv-stage"
        :class="{ 'is-measured': isMeasured }"
        :style="
          isMeasured
            ? { width: `${paperSize.width * scale}px`, height: `${paperSize.height * scale}px` }
            : undefined
        ">
        <article
          v-if="model"
          ref="paperRef"
          class="harvard-cv"
          data-testid="harvard-cv"
          :style="{ transform: `scale(${scale})` }">
          <header class="cv-header">
            <h1 class="cv-name">{{ model.name }}</h1>
            <p class="cv-headline">{{ model.headline }}</p>
            <p class="cv-contact">
              <template v-for="(item, index) in model.contact" :key="item.text">
                <span v-if="index" aria-hidden="true"> | </span>
                <a v-if="item.href" :href="item.href">{{ item.text }}</a>
                <span v-else>{{ item.text }}</span>
              </template>
            </p>
          </header>

          <section
            v-for="section in model.sections"
            :key="section.id"
            :data-section="section.id">
            <h2 class="cv-section-title">{{ section.title }}</h2>
            <p v-if="section.paragraph">{{ section.paragraph }}</p>

            <div v-for="entry in section.entries" :key="entry.title" class="cv-entry">
              <div class="cv-row">
                <strong>{{ entry.title }}</strong>
                <span v-if="entry.titleRight">{{ entry.titleRight }}</span>
              </div>
              <div v-if="entry.subtitle || entry.subtitleRight" class="cv-row cv-italic">
                <span>{{ entry.subtitle }}</span>
                <span v-if="entry.subtitleRight">{{ entry.subtitleRight }}</span>
              </div>
              <p v-if="entry.summary" class="cv-summary">{{ entry.summary }}</p>
              <ul v-if="entry.bullets.length" class="cv-bullets">
                <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>

            <p v-for="line in section.lines" :key="line.label" class="cv-line">
              <strong>{{ line.label }}:</strong> {{ line.text }}
            </p>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@fontsource/tinos/400.css'
import '@fontsource/tinos/400-italic.css'
import '@fontsource/tinos/700.css'
import { useI18n } from 'vue-i18n'

import { cvDownloadPath } from '~/utils/profile'
import { MAX_ZOOM, MIN_ZOOM, fitZoom, stepZoom } from '~/utils/zoom'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: model } = await useFetch(() => `/api/cv/${locale.value}`)

useHead(() => ({
  title: `${t('cv.title')} | Carlos García`,
  meta: [{ name: 'description', content: t('cv.description') }],
  // without JavaScript the page is shown at its real size
  noscript: [{ innerHTML: '<style>.cv-stage{opacity:1!important}</style>' }]
}))

/** 'fit' follows the screen width; 'manual' keeps the zoom the visitor chose. */
const mode = ref<'fit' | 'manual'>('fit')
const scale = ref(1)
const viewportRef = ref<HTMLElement>()
const paperRef = ref<HTMLElement>()
const availableWidth = ref(0)
const paperSize = reactive({ width: 0, height: 0 })
const isMeasured = ref(false)


function measure() {
  const viewport = viewportRef.value
  const paper = paperRef.value
  if (!viewport || !paper) return

  const style = getComputedStyle(viewport)
  availableWidth.value =
    viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
  // offset sizes ignore the CSS transform, so this is the real page size
  paperSize.width = paper.offsetWidth
  paperSize.height = paper.offsetHeight

  if (mode.value === 'fit') scale.value = fitZoom(availableWidth.value, paperSize.width)
  isMeasured.value = true
}

function zoom(direction: 'in' | 'out') {
  mode.value = 'manual'
  scale.value = stepZoom(scale.value, direction)
}

function toggleFit() {
  if (mode.value === 'fit') {
    mode.value = 'manual'
    scale.value = 1
  } else {
    mode.value = 'fit'
    measure()
  }
}

function print() {
  window.print()
}

let observer: ResizeObserver | undefined

onMounted(() => {
  measure()
  // re-fit on rotation/resize and when the web font changes the page height
  observer = new ResizeObserver(() => measure())
  if (viewportRef.value) observer.observe(viewportRef.value)
  if (paperRef.value) observer.observe(paperRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
/* the page (210mm) plus the viewer padding: wider screens show it at real size,
   so "fit / actual size" is only useful below this width */
@media (min-width: 830px) {
  .cv-fit-toggle {
    display: none;
  }
}

.cv-viewport {
  overflow-x: auto;
  padding: 0 1rem 1rem;
}

.cv-stage {
  margin: 0 auto;
  /* avoid showing the unscaled page on phones before it is measured */
  opacity: 0;
}

.cv-stage.is-measured {
  opacity: 1;
  transition: opacity 0.15s;
}

/* Harvard format: serif, black on white, centered header, ruled sections.
   A real A4 page, scaled as a whole so it never reflows. Sizes mirror the
   PDF (server/utils/harvard-pdf.ts). */
.harvard-cv {
  box-sizing: border-box;
  width: 210mm;
  min-height: 297mm;
  padding: 14mm 15mm;
  transform-origin: top left;
  font-family: 'Tinos', 'Times New Roman', Times, serif;
  font-size: 10pt;
  line-height: 1.3;
  color: #000;
  background: #fff;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
}

.cv-header {
  text-align: center;
}

.cv-name {
  font-size: 20pt;
  font-weight: 700;
  line-height: 1.2;
}

.cv-headline {
  font-style: italic;
  font-size: 10.5pt;
}

.cv-contact {
  font-size: 9pt;
}

.cv-contact a,
.cv-contact span {
  white-space: nowrap;
}

.cv-contact a {
  color: inherit;
  text-decoration: none;
}

.cv-contact a:hover {
  text-decoration: underline;
}

.cv-section-title {
  margin-top: 10pt;
  margin-bottom: 4pt;
  font-size: 10.5pt;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-bottom: 0.7pt solid #000;
}

.cv-entry {
  margin-bottom: 5pt;
  break-inside: avoid;
}

.cv-row {
  display: flex;
  justify-content: space-between;
  column-gap: 12pt;
}

.cv-italic {
  font-style: italic;
}

.cv-summary {
  color: #333;
}

.cv-bullets {
  list-style: disc;
  padding-left: 16pt;
}

@media print {
  .cv-viewport {
    overflow: visible;
    padding: 0;
  }

  .cv-stage {
    width: auto !important;
    height: auto !important;
    opacity: 1;
  }

  .harvard-cv {
    width: auto;
    min-height: 0;
    padding: 0;
    transform: none !important;
    box-shadow: none;
  }
}
</style>

<style>
@page {
  size: A4;
  margin: 12mm;
}
</style>
