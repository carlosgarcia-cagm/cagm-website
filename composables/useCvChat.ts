import { useI18n } from 'vue-i18n'

export interface ChatEntry {
  id: number
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

// keep in sync with CHAT_LIMITS in server/utils/chat.ts
const MAX_HISTORY = 8
const MAX_ANSWER_LENGTH = 1500

/** Conversation state for the "Ask my CV" widget; answers arrive streamed. */
export function useCvChat() {
  const { locale, t } = useI18n()

  const messages = ref<ChatEntry[]>([])
  const isStreaming = ref(false)
  let controller: AbortController | null = null
  let nextId = 0

  function errorMessage(status: number) {
    if (status === 429) return t('chat.errors.rateLimited')
    if (status === 503) return t('chat.errors.unavailable')
    return t('chat.errors.generic')
  }

  async function send(text: string) {
    const question = text.trim()
    if (!question || isStreaming.value) return

    messages.value.push({ id: nextId++, role: 'user', content: question })
    const history = messages.value
      .filter((m) => !m.error && m.content)
      .slice(-MAX_HISTORY)
      .map(({ role, content }) => ({
        role,
        content: role === 'assistant' ? content.slice(0, MAX_ANSWER_LENGTH) : content
      }))

    messages.value.push({ id: nextId++, role: 'assistant', content: '' })
    // mutate through the reactive proxy so the UI updates while streaming
    const answer = messages.value[messages.value.length - 1]!

    isStreaming.value = true
    controller = new AbortController()
    let status = 0

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: locale.value, messages: history }),
        signal: controller.signal
      })
      status = response.status
      if (!response.ok || !response.body) throw new Error(`HTTP ${status}`)

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        answer.content += decoder.decode(value, { stream: true })
      }
      if (!answer.content.trim()) throw new Error('Empty answer')
    } catch (error) {
      if (controller?.signal.aborted) {
        if (!answer.content) messages.value.pop()
        return
      }
      console.error('[chat]', error)
      answer.content = errorMessage(status)
      answer.error = true
    } finally {
      isStreaming.value = false
      controller = null
    }
  }

  function stop() {
    controller?.abort()
  }

  return { messages, isStreaming, send, stop }
}
