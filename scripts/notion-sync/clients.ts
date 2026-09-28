import { Client } from '@notionhq/client'

import type { NotionPage } from './prompt'

/** Reads each Notion page as Markdown (official API, no conversion needed). */
export async function fetchNotionPages(
  token: string,
  sources: ReadonlyArray<{ id: string; label: string }>
): Promise<NotionPage[]> {
  const notion = new Client({ auth: token })
  const pages: NotionPage[] = []
  for (const source of sources) {
    const page = await notion.pages.retrieveMarkdown({ page_id: source.id })
    if (page.truncated) {
      console.warn(
        `[notion-sync] "${source.label}" is too long and was truncated by Notion`
      )
    }
    pages.push({ id: source.id, label: source.label, markdown: page.markdown })
  }
  return pages
}

/** DeepSeek chat completion (OpenAI-compatible) that must answer with JSON. */
export async function completeJson(
  messages: Array<{ role: 'system' | 'user'; content: string }>,
  options: { apiKey: string; baseUrl?: string; model?: string }
): Promise<string> {
  const response = await fetch(
    `${options.baseUrl ?? 'https://api.deepseek.com'}/chat/completions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: options.model ?? 'deepseek-chat',
        messages,
        temperature: 0,
        max_tokens: 8000,
        response_format: { type: 'json_object' }
      }),
      signal: AbortSignal.timeout(180_000)
    }
  )
  if (!response.ok) {
    throw new Error(
      `DeepSeek error ${response.status}: ${await response.text()}`
    )
  }
  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string }; finish_reason?: string }>
  }
  const choice = data.choices?.[0]
  if (choice?.finish_reason === 'length')
    throw new Error('DeepSeek answer was cut off (max_tokens)')
  if (!choice?.message?.content)
    throw new Error('DeepSeek returned an empty answer')
  return choice.message.content
}
