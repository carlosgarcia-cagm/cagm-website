import type { CvContent } from './cv-content'

export interface NotionPage {
  id: string
  label: string
  markdown: string
}

export interface SyncProposal {
  /** human-readable list of what changed, in Spanish (goes to the PR) */
  changes: string[]
  es: CvContent
  en: CvContent
}

export function formatNotionPages(pages: NotionPage[]): string {
  return pages
    .map(
      (page) =>
        `=== Notion page: ${page.label} (${page.id}) ===\n${page.markdown.trim()}`
    )
    .join('\n\n')
}

const SYSTEM_PROMPT = `You keep the CV website of Carlos García in sync with his Notion notes. Notion is the single source of truth.

You receive the current website content (Spanish and English), the previous version of the Notion pages (what the website was last synced from, if any) and the current Notion pages. Return the website content updated to match Notion.

Rules:
- Only change what Notion changed (compare previous and current Notion). Keep every other text exactly as it is, word for word, to keep the diff small.
- Never invent facts, numbers, dates, employers, skills or links. Use only what Notion says.
- If Notion marks something as excluded from the active CV (for example "Fuera del CV activo", "excluded", "no incluir"), remove it from the website.
- The summary must keep the literal placeholder {years} instead of a number of years of experience (for example "Más de {years} años", "{years}+ years").
- Spanish and English must have exactly the same structure: same experiences in the same order, same number of achievements and projects, same ids, same technologies and skill names. Write natural, professional English.
- Skill levels: "primary" for 3 or more years of experience, "secondary" for less.
- Keep existing ids; new ids are lowercase kebab-case. Mark only the role in progress with "current": true.
- Achievements are one sentence each, starting with a past-tense verb, without a final period.
- In "changes", list each change in Spanish, short and concrete (for example "Roi Studio: nuevo logro sobre …"). If nothing relevant changed, return an empty list and the content unchanged.

Answer with one JSON object: {"changes": string[], "es": <content>, "en": <content>}, where <content> has the same shape as the current content you receive.`

export function buildSyncMessages(input: {
  current: { es: CvContent; en: CvContent }
  previousNotion: string | null
  currentNotion: string
}) {
  const user = [
    '## Current website content (JSON)',
    JSON.stringify(input.current, null, 2),
    '## Previous Notion pages (last sync)',
    input.previousNotion?.trim() ||
      '(none: this is the first sync, align the website with Notion)',
    '## Current Notion pages',
    input.currentNotion
  ].join('\n\n')

  return [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    { role: 'user' as const, content: user }
  ]
}

/** Parses the model answer; throws with a readable message when it is unusable. */
export function parseSyncProposal(raw: string): SyncProposal {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    throw new Error('The model did not return valid JSON')
  }
  const proposal = data as Partial<SyncProposal>
  if (!Array.isArray(proposal.changes) || !proposal.es || !proposal.en) {
    throw new Error('The model answer is missing "changes", "es" or "en"')
  }
  return {
    changes: proposal.changes.map(String),
    es: proposal.es as CvContent,
    en: proposal.en as CvContent
  }
}
