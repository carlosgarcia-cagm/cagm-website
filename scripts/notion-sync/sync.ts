import { createHash } from 'node:crypto'

import {
  applyCvContent,
  extractCvContent,
  serializeLocale,
  validateTranslations,
  type LocaleMessages
} from './cv-content'
import {
  buildSyncMessages,
  formatNotionPages,
  parseSyncProposal,
  type NotionPage
} from './prompt'

export interface SyncDeps {
  readLocale(locale: 'es' | 'en'): Promise<LocaleMessages>
  writeLocaleSource(locale: 'es' | 'en', source: string): Promise<void>
  /** the Notion Markdown of the last sync, or null on the first run */
  readSnapshot(): Promise<string | null>
  writeSnapshot(markdown: string): Promise<void>
  fetchNotion(): Promise<NotionPage[]>
  complete(messages: ReturnType<typeof buildSyncMessages>): Promise<string>
  log(message: string): void
}

export type SyncResult =
  | { status: 'unchanged' }
  | { status: 'no-content-change'; notionChanged: true }
  | { status: 'updated'; changes: string[] }

export const hashNotion = (markdown: string) =>
  createHash('sha256').update(markdown).digest('hex')

/**
 * Syncs the Notion-owned website content with Notion:
 * 1. reads the Notion pages and compares them with the last synced snapshot;
 * 2. if they changed, asks the model to apply those changes to es/en content;
 * 3. validates the answer and writes the locale files and the new snapshot.
 * With `dryRun`, nothing is written.
 */
export async function runSync(
  deps: SyncDeps,
  options: { dryRun?: boolean } = {}
): Promise<SyncResult> {
  const notionMarkdown = formatNotionPages(await deps.fetchNotion())
  const previous = await deps.readSnapshot()

  if (
    previous !== null &&
    hashNotion(previous) === hashNotion(notionMarkdown)
  ) {
    deps.log('Notion has not changed since the last sync')
    return { status: 'unchanged' }
  }

  const [es, en] = await Promise.all([
    deps.readLocale('es'),
    deps.readLocale('en')
  ])
  const current = { es: extractCvContent(es), en: extractCvContent(en) }

  deps.log('Notion changed: asking the model to apply the changes')
  const proposal = parseSyncProposal(
    await deps.complete(
      buildSyncMessages({
        current,
        previousNotion: previous,
        currentNotion: notionMarkdown
      })
    )
  )

  const errors = validateTranslations(proposal.es, proposal.en)
  if (errors.length) {
    throw new Error(
      `The proposed content is invalid:\n- ${errors.join('\n- ')}`
    )
  }

  const unchanged =
    JSON.stringify(proposal.es) === JSON.stringify(current.es) &&
    JSON.stringify(proposal.en) === JSON.stringify(current.en)

  if (options.dryRun) {
    deps.log(
      unchanged
        ? 'Dry run: no content changes'
        : `Dry run: would apply\n- ${proposal.changes.join('\n- ')}`
    )
    return unchanged
      ? { status: 'no-content-change', notionChanged: true }
      : { status: 'updated', changes: proposal.changes }
  }

  // the snapshot moves forward even when the website does not need changes,
  // so the same Notion edit is not analyzed again tomorrow
  await deps.writeSnapshot(notionMarkdown)
  if (unchanged) {
    deps.log('Notion changed, but nothing that the website shows')
    return { status: 'no-content-change', notionChanged: true }
  }

  await deps.writeLocaleSource(
    'es',
    serializeLocale(applyCvContent(es, proposal.es))
  )
  await deps.writeLocaleSource(
    'en',
    serializeLocale(applyCvContent(en, proposal.en))
  )
  return { status: 'updated', changes: proposal.changes }
}
