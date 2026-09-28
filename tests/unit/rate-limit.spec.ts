import { describe, expect, it } from 'vitest'

import {
  createMemoryRateLimiter,
  rateLimitOptionsFromEnv,
  redisConfigFromEnv
} from '../../server/utils/rate-limit'

describe('createMemoryRateLimiter', () => {
  it('limits each IP within its window and tells when to retry', async () => {
    let now = 0
    const limiter = createMemoryRateLimiter(
      { ipLimit: 2, ipWindowMs: 60_000, dailyLimit: 100 },
      () => now
    )

    expect((await limiter.check('1.1.1.1')).ok).toBe(true)
    expect((await limiter.check('1.1.1.1')).ok).toBe(true)
    expect(await limiter.check('1.1.1.1')).toEqual({ ok: false, retryAfter: 60 })
    expect((await limiter.check('2.2.2.2')).ok).toBe(true)

    now = 60_000
    expect((await limiter.check('1.1.1.1')).ok).toBe(true)
  })

  it('enforces the daily limit across all IPs and reports what is left', async () => {
    const limiter = createMemoryRateLimiter({ ipLimit: 10, ipWindowMs: 60_000, dailyLimit: 2 })
    expect(await limiter.dailyRemaining()).toBe(2)
    expect((await limiter.check('a')).ok).toBe(true)
    expect(await limiter.dailyRemaining()).toBe(1)
    expect((await limiter.check('b')).ok).toBe(true)
    expect((await limiter.check('c')).ok).toBe(false)
    expect(await limiter.dailyRemaining()).toBe(0)
  })
})

describe('configuration from env', () => {
  it('uses defaults and allows overrides', () => {
    expect(rateLimitOptionsFromEnv({})).toMatchObject({ ipLimit: 10, dailyLimit: 300 })
    expect(
      rateLimitOptionsFromEnv({ CHAT_IP_LIMIT: '5', CHAT_DAILY_LIMIT: '50' })
    ).toMatchObject({ ipLimit: 5, dailyLimit: 50 })
  })

  it('reads Upstash credentials from either naming scheme', () => {
    expect(redisConfigFromEnv({})).toBeNull()
    expect(
      redisConfigFromEnv({ UPSTASH_REDIS_REST_URL: 'https://u', UPSTASH_REDIS_REST_TOKEN: 't' })
    ).toEqual({ url: 'https://u', token: 't' })
    expect(
      redisConfigFromEnv({ KV_REST_API_URL: 'https://k', KV_REST_API_TOKEN: 'k' })
    ).toEqual({ url: 'https://k', token: 'k' })
  })
})
