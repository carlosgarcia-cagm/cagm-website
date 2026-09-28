import { buildLlmsTxt } from '../utils/llms-txt'

export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400'
  })
  return buildLlmsTxt()
})
