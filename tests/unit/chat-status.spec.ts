import { describe, expect, it, vi } from 'vitest'

import {
  chatConfigFromEnv,
  computeChatStatus,
  hasDeepSeekBalance,
  type ChatConfig
} from '../../server/utils/chat-status'
import type { RateLimiter } from '../../server/utils/rate-limit'

const config: ChatConfig = { enabled: true, apiKey: 'key', baseUrl: 'https://api.test' }
const limiter = (remaining: number | Error): RateLimiter => ({
  check: async () => ({ ok: true, retryAfter: 0 }),
  dailyRemaining: async () => {
    if (remaining instanceof Error) throw remaining
    return remaining
  }
})

describe('computeChatStatus', () => {
  it('is available when every check passes', async () => {
    const checkBalance = vi.fn(async () => true)
    expect(await computeChatStatus({ config, limiter: limiter(10), checkBalance })).toEqual({
      available: true
    })
    expect(checkBalance).toHaveBeenCalledOnce()
  })

  it.each([
    ['disabled', { config: { ...config, enabled: false }, limiter: limiter(10), balance: true }],
    ['missing-api-key', { config: { ...config, apiKey: undefined }, limiter: limiter(10), balance: true }],
    ['missing-rate-limit', { config, limiter: null, balance: true }],
    ['rate-limit-unreachable', { config, limiter: limiter(new Error('down')), balance: true }],
    ['daily-limit-reached', { config, limiter: limiter(0), balance: true }],
    ['no-balance', { config, limiter: limiter(10), balance: false }]
  ] as const)('hides the chat when %s', async (reason, deps) => {
    const status = await computeChatStatus({
      config: deps.config,
      limiter: deps.limiter,
      checkBalance: async () => deps.balance
    })
    expect(status).toEqual({ available: false, reason })
  })

  it('does not call DeepSeek when a cheaper check already failed', async () => {
    const checkBalance = vi.fn(async () => true)
    await computeChatStatus({ config, limiter: limiter(0), checkBalance })
    expect(checkBalance).not.toHaveBeenCalled()
  })
})

describe('hasDeepSeekBalance', () => {
  const respond = (status: number, body: unknown) =>
    vi.fn(async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch

  it('asks the balance endpoint with the API key', async () => {
    const fetchMock = respond(200, { is_available: true })
    expect(await hasDeepSeekBalance(config, fetchMock)).toBe(true)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.test/user/balance',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer key' }) })
    )
  })

  it.each([
    ['no balance', respond(200, { is_available: false })],
    ['invalid key', respond(401, { error: 'unauthorized' })],
    [
      'network error',
      vi.fn(async () => {
        throw new Error('offline')
      }) as unknown as typeof fetch
    ]
  ])('is false on %s', async (_, fetchMock) => {
    expect(await hasDeepSeekBalance(config, fetchMock)).toBe(false)
  })
})

describe('chatConfigFromEnv', () => {
  it('is enabled unless CHAT_ENABLED=false', () => {
    expect(chatConfigFromEnv({}).enabled).toBe(true)
    expect(chatConfigFromEnv({ CHAT_ENABLED: 'false' }).enabled).toBe(false)
    expect(chatConfigFromEnv({}).baseUrl).toBe('https://api.deepseek.com')
    expect(chatConfigFromEnv({ DEEPSEEK_API_KEY: '' }).apiKey).toBeUndefined()
  })
})
