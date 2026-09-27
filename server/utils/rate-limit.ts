import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export interface RateLimitResult {
  ok: boolean
  /** seconds until the visitor can try again (0 when allowed) */
  retryAfter: number
}

export interface RateLimiter {
  check(ip: string): Promise<RateLimitResult>
  /** questions left today for the whole site; throws if the store is unreachable */
  dailyRemaining(): Promise<number>
}

export interface RateLimitOptions {
  /** requests per IP in `ipWindowMs` */
  ipLimit: number
  ipWindowMs: number
  /** requests for the whole site per day, to cap the LLM bill */
  dailyLimit: number
}

const DAY_MS = 24 * 60 * 60 * 1000

export function rateLimitOptionsFromEnv(env = process.env): RateLimitOptions {
  return {
    ipLimit: Number(env.CHAT_IP_LIMIT) || 10,
    ipWindowMs: 10 * 60 * 1000,
    dailyLimit: Number(env.CHAT_DAILY_LIMIT) || 300
  }
}

/**
 * In-memory sliding window. Only for local development: on serverless every
 * instance has its own memory, so it does not protect production.
 */
export function createMemoryRateLimiter(
  options: RateLimitOptions,
  now: () => number = Date.now
): RateLimiter {
  const hits = new Map<string, number[]>()

  const recentHits = (key: string, windowMs: number) =>
    (hits.get(key) ?? []).filter((t) => now() - t < windowMs)

  function take(key: string, limit: number, windowMs: number): RateLimitResult {
    const current = now()
    const recent = recentHits(key, windowMs)
    if (recent.length >= limit) {
      hits.set(key, recent)
      const retryAfter = Math.ceil((recent[0]! + windowMs - current) / 1000)
      return { ok: false, retryAfter }
    }
    recent.push(current)
    hits.set(key, recent)
    return { ok: true, retryAfter: 0 }
  }

  return {
    async check(ip) {
      const perIp = take(`ip:${ip}`, options.ipLimit, options.ipWindowMs)
      if (!perIp.ok) return perIp
      return take('global', options.dailyLimit, DAY_MS)
    },
    async dailyRemaining() {
      return Math.max(0, options.dailyLimit - recentHits('global', DAY_MS).length)
    }
  }
}

/** Upstash Redis (REST) rate limiter, shared by every serverless instance. */
export function createRedisRateLimiter(
  redis: Redis,
  options: RateLimitOptions
): RateLimiter {
  const perIp = new Ratelimit({
    redis,
    prefix: 'cagm-chat:ip',
    limiter: Ratelimit.slidingWindow(options.ipLimit, `${options.ipWindowMs} ms`)
  })
  const global = new Ratelimit({
    redis,
    prefix: 'cagm-chat:global',
    limiter: Ratelimit.fixedWindow(options.dailyLimit, '1 d')
  })

  async function take(limiter: Ratelimit, key: string): Promise<RateLimitResult> {
    const { success, reset } = await limiter.limit(key)
    return {
      ok: success,
      retryAfter: success ? 0 : Math.max(1, Math.ceil((reset - Date.now()) / 1000))
    }
  }

  return {
    async check(ip) {
      const ipResult = await take(perIp, ip)
      if (!ipResult.ok) return ipResult
      return take(global, 'all')
    },
    async dailyRemaining() {
      // reads the counter without consuming a request (fails if Redis is down)
      const { remaining } = await global.getRemaining('all')
      return remaining
    }
  }
}

/**
 * Upstash credentials: the Vercel Marketplace integration exposes them as
 * KV_REST_API_*, the Upstash console as UPSTASH_REDIS_REST_*.
 */
export function redisConfigFromEnv(env = process.env) {
  const url = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL
  const token = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN
  return url && token ? { url, token } : null
}

let limiter: RateLimiter | null | undefined

/**
 * Returns the rate limiter for this deployment, or `null` when running on
 * Vercel without Redis (the chat must not be exposed unprotected).
 */
export function getRateLimiter(): RateLimiter | null {
  if (limiter !== undefined) return limiter

  const options = rateLimitOptionsFromEnv()
  const redisConfig = redisConfigFromEnv()

  if (redisConfig) {
    limiter = createRedisRateLimiter(new Redis(redisConfig), options)
  } else if (process.env.VERCEL) {
    console.error('[chat] Redis is not configured; the chat is disabled on Vercel')
    limiter = null
  } else {
    console.warn('[chat] Redis is not configured; using an in-memory rate limit')
    limiter = createMemoryRateLimiter(options)
  }
  return limiter
}
