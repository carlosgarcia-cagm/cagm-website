import { getChatStatus } from '../../utils/chat-status'

/**
 * Tells the widget whether to show itself. The reason stays in the server
 * logs: visitors only need to know if the chat is available.
 */
export default defineEventHandler(async (event) => {
  const { available } = await getChatStatus()
  setResponseHeader(event, 'Cache-Control', 'public, max-age=0, s-maxage=60')
  return { available }
})
