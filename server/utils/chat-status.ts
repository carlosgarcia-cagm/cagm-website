import { getRateLimiter, type RateLimiter } from './rate-limit'

export type ChatUnavailableReason =
  | 'disabled'
  | 'missing-api-key'
  | 'missing-rate-limit'
  | 'rate-limit-unreachable'
  | 'daily-limit-reached'
  | 'no-balance'

export interface ChatStatus {
  available: boolean
  reason?: ChatUnavailableReason
}

export interface ChatConfig {
  /** CHAT_ENABLED=false turns the chat off without removing the API key */
  enabled: boolean
  apiKey: string | undefined
  baseUrl: string
}

export function chatConfigFromEnv(env = process.env): ChatConfig {
  return {
    enabled: env.CHAT_ENABLED !== 'false',
    apiKey: env.DEEPSEEK_API_KEY || undefined,
    baseUrl: env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
  }
}

/**
 * Asks DeepSeek whether the account can serve requests (it has balance).
 * This endpoint does not consume tokens.
 */
export async function hasDeepSeekBalance(
  config: Pick<ChatConfig, 'apiKey' | 'baseUrl'>,
  fetchImpl: typeof fetch = fetch
): Promise<boolean> {
  try {
    const response = await fetchImpl(`${config.baseUrl}/user/balance`, {
      headers: { Authorization: `Bearer ${config.apiKey}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(5000)
    })
    if (!response.ok) return false
    const body = (await response.json()) as { is_available?: unknown }
    return body.is_available === true
  } catch {
    return false
  }
}

/**
 * The chat is shown only when every check passes: it is enabled, configured,
 * protected by a working rate limit with quota left today, and DeepSeek can
 * answer. Cheap checks run first so DeepSeek is only asked when needed.
 */
export async function computeChatStatus(deps: {
  config: ChatConfig
  limiter: RateLimiter | null
  checkBalance: (config: ChatConfig) => Promise<boolean>
}): Promise<ChatStatus> {
  const { config, limiter } = deps
  if (!config.enabled) return { available: false, reason: 'disabled' }
  if (!config.apiKey) return { available: false, reason: 'missing-api-key' }
  if (!limiter) return { available: false, reason: 'missing-rate-limit' }

  let remaining: number
  try {
    remaining = await limiter.dailyRemaining()
  } catch {
    return { available: false, reason: 'rate-limit-unreachable' }
  }
  if (remaining <= 0) return { available: false, reason: 'daily-limit-reached' }

  if (!(await deps.checkBalance(config))) return { available: false, reason: 'no-balance' }

  return { available: true }
}

const STATUS_TTL_MS = 60_000
let cached: { status: ChatStatus; expiresAt: number } | undefined

/** Chat status for this deployment, cached for a minute per instance. */
export async function getChatStatus(): Promise<ChatStatus> {
  if (cached && cached.expiresAt > Date.now()) return cached.status

  const status = await computeChatStatus({
    config: chatConfigFromEnv(),
    limiter: getRateLimiter(),
    checkBalance: (config) => hasDeepSeekBalance(config)
  })
  if (!cached || status.reason !== cached.status.reason) {
    console.info(`[chat] ${status.available ? 'available' : `hidden: ${status.reason}`}`)
  }
  cached = { status, expiresAt: Date.now() + STATUS_TTL_MS }
  return status
}
