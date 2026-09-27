import en from '../../locales/en-US'
import es from '../../locales/es-ES'
import { buildSystemPrompt, parseChatRequest, parseSseChunk } from '../utils/chat'
import { chatConfigFromEnv } from '../utils/chat-status'
import { getRateLimiter } from '../utils/rate-limit'

const CV = { es, en } as const
const MAX_BODY_BYTES = 16 * 1024
const UPSTREAM_TIMEOUT_MS = 30_000

function isSameHost(origin: string, host: string) {
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  const { enabled, apiKey, baseUrl } = chatConfigFromEnv()
  const limiter = getRateLimiter()
  if (!enabled || !apiKey || !limiter) {
    throw createError({ statusCode: 503, statusMessage: 'Chat unavailable' })
  }

  // browsers always send Origin on POST: only this site may call the endpoint
  const origin = getRequestHeader(event, 'origin')
  if (origin && !isSameHost(origin, getRequestHost(event, { xForwardedHost: true }))) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  if (Number(getRequestHeader(event, 'content-length') ?? 0) > MAX_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Payload too large' })
  }

  const chat = parseChatRequest(await readBody(event))
  if (!chat) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid chat request' })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const rate = await limiter.check(ip)
  if (!rate.ok) {
    setResponseHeader(event, 'Retry-After', rate.retryAfter)
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      stream: true,
      max_tokens: 500,
      temperature: 0.3,
      messages: [
        { role: 'system', content: buildSystemPrompt(CV[chat.locale], chat.locale) },
        ...chat.messages
      ]
    }),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
  }).catch((error: unknown) => {
    console.error('[chat] DeepSeek request failed', error)
    return null
  })

  if (!upstream?.ok || !upstream.body) {
    if (upstream) {
      console.error('[chat] DeepSeek error', upstream.status, await upstream.text())
    }
    throw createError({ statusCode: 502, statusMessage: 'Assistant unavailable' })
  }

  // Re-stream only the answer text (not DeepSeek's SSE envelope) to the browser
  const reader = upstream.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await reader.read()
      if (done) {
        controller.close()
        return
      }
      buffer += decoder.decode(value, { stream: true })
      const parsed = parseSseChunk(buffer)
      buffer = parsed.rest
      for (const delta of parsed.deltas) controller.enqueue(encoder.encode(delta))
      if (parsed.done) {
        controller.close()
        await reader.cancel()
      }
    },
    cancel() {
      return reader.cancel()
    }
  })

  setResponseHeaders(event, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Accel-Buffering': 'no'
  })
  return sendStream(event, stream)
})
