<template>
  <div
    class="print:hidden fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
    <section
      v-if="isOpen"
      id="cv-chat"
      role="dialog"
      aria-labelledby="cv-chat-title"
      data-testid="chat-panel"
      class="flex flex-col w-[min(24rem,calc(100vw-2rem))] h-[min(34rem,calc(100dvh-7rem))] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      @keydown.esc="close">
      <header class="flex items-center justify-between gap-2 px-4 py-3 bg-accent text-white">
        <h2 id="cv-chat-title" class="font-semibold">{{ t('chat.title') }}</h2>
        <button
          type="button"
          class="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-700"
          :aria-label="t('chat.close')"
          @click="close">
          <Icon name="heroicons:x-mark" size="20" aria-hidden="true" />
        </button>
      </header>

      <div
        ref="scrollRef"
        class="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        aria-live="polite"
        data-testid="chat-messages">
        <p class="max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
          {{ t('chat.greeting') }}
        </p>

        <div v-if="!messages.length" class="flex flex-wrap gap-2 pt-1">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            type="button"
            class="text-left text-sm px-3 py-1.5 rounded-full border border-primary-600/30 dark:border-accent/40 text-primary-600 dark:text-accent hover:bg-primary-600/5 dark:hover:bg-accent/10"
            @click="ask(suggestion)">
            {{ suggestion }}
          </button>
        </div>

        <p
          v-for="message in messages"
          :key="message.id"
          :data-role="message.role"
          class="max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line"
          :class="
            message.role === 'user'
              ? 'ml-auto rounded-br-sm bg-blue-600 text-white'
              : message.error
                ? 'rounded-bl-sm bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : 'rounded-bl-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
          ">
          <template v-if="message.content">{{ message.content }}</template>
          <span v-else class="text-gray-500 dark:text-gray-400">{{ t('chat.typing') }}</span>
        </p>
      </div>

      <form
        class="border-t border-gray-200 dark:border-gray-700 px-3 pt-2 pb-3"
        @submit.prevent="ask(draft)">
        <p class="text-[11px] leading-snug text-gray-500 dark:text-gray-400 mb-2">
          {{ t('chat.disclaimer') }}
        </p>
        <div class="flex items-center gap-2">
          <input
            ref="inputRef"
            v-model="draft"
            type="text"
            :maxlength="MAX_QUESTION_LENGTH"
            :placeholder="t('chat.placeholder')"
            :aria-label="t('chat.placeholder')"
            data-testid="chat-input"
            class="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
          <button
            type="submit"
            :disabled="isStreaming || !draft.trim()"
            :aria-label="t('chat.send')"
            class="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-accent hover:bg-accent-dark text-white disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="heroicons:paper-airplane" size="20" aria-hidden="true" />
          </button>
        </div>
      </form>
    </section>

    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-dark text-white px-4 py-3 shadow-lg transition-colors"
      :aria-expanded="isOpen"
      aria-controls="cv-chat"
      :aria-label="isOpen ? t('chat.close') : t('chat.open')"
      data-testid="chat-toggle"
      @click="isOpen ? close() : open()">
      <Icon
        :name="isOpen ? 'heroicons:x-mark' : 'heroicons:chat-bubble-left-right'"
        size="24"
        aria-hidden="true" />
      <span v-if="!isOpen" class="hidden sm:inline font-semibold">{{ t('chat.open') }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

// keep in sync with CHAT_LIMITS.maxMessageLength in server/utils/chat.ts
const MAX_QUESTION_LENGTH = 500

const { t, tm, rt } = useI18n()
const { messages, isStreaming, send, stop } = useCvChat()

const isOpen = ref(false)
const draft = ref('')
const inputRef = ref<HTMLInputElement>()
const scrollRef = ref<HTMLElement>()

const suggestions = computed(() => (tm('chat.suggestions') as unknown[]).map(s => rt(s as string)))

async function open() {
  isOpen.value = true
  await nextTick()
  inputRef.value?.focus()
}

function close() {
  stop()
  isOpen.value = false
}

function ask(text: string) {
  draft.value = ''
  send(text)
}

// keep the latest message in view while the answer streams in
watch(
  () => messages.value.map((m) => m.content.length).join(),
  async () => {
    await nextTick()
    scrollRef.value?.scrollTo({ top: scrollRef.value.scrollHeight })
  }
)
</script>
