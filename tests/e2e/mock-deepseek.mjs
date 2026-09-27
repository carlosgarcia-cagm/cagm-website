// Minimal stand-in for DeepSeek's OpenAI-compatible streaming API, used by the
// e2e tests so the full chat flow runs without network or cost.
import { createServer } from 'node:http'

const PORT = Number(process.env.MOCK_DEEPSEEK_PORT || 3199)

createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/user/balance') {
    const ok = req.headers.authorization === 'Bearer test-key'
    res.writeHead(ok ? 200 : 401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ is_available: ok, balance_infos: [] }))
    return
  }
  if (req.method !== 'POST' || req.url !== '/chat/completions') {
    res.writeHead(404).end()
    return
  }
  if (req.headers.authorization !== 'Bearer test-key') {
    res.writeHead(401).end('{"error":"invalid key"}')
    return
  }

  let raw = ''
  for await (const chunk of req) raw += chunk
  const body = JSON.parse(raw)
  const system = body.messages[0]
  const question = body.messages.at(-1).content

  if (question.includes('[fail]')) {
    res.writeHead(500).end('{"error":"boom"}')
    return
  }

  const hasCv = system.role === 'system' && system.content.includes('<cv>')
  const answer = `Mock answer (${hasCv ? 'with CV' : 'no CV'}, ${body.messages.length - 1} messages): ${question}`

  res.writeHead(200, { 'Content-Type': 'text/event-stream' })
  for (const word of answer.split(/(?<= )/)) {
    const delta = { choices: [{ index: 0, delta: { content: word } }] }
    res.write(`data: ${JSON.stringify(delta)}\n\n`)
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  res.end('data: [DONE]\n\n')
}).listen(PORT, () => console.log(`mock DeepSeek on :${PORT}`))
