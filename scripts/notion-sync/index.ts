/**
 * Notion → website sync. Run: bun scripts/notion-sync/index.ts [--dry-run]
 * Env: NOTION_TOKEN, DEEPSEEK_API_KEY (optional: DEEPSEEK_MODEL, DEEPSEEK_BASE_URL)
 * In GitHub Actions it writes `changed=true|false` to $GITHUB_OUTPUT and the
 * pull request description to $NOTION_SYNC_PR_BODY.
 */
import { spawnSync } from 'node:child_process'
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { completeJson, fetchNotionPages } from './clients'
import { NOTION_SOURCES } from './sources'
import { runSync } from './sync'

const ROOT = resolve(import.meta.dirname, '../..')
const LOCALE_FILES = { es: 'locales/es-ES.ts', en: 'locales/en-US.ts' } as const
const SNAPSHOT_FILE = 'content/notion-snapshot.md'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable ${name}`)
  return value
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const notionToken = requireEnv('NOTION_TOKEN')
  const apiKey = requireEnv('DEEPSEEK_API_KEY')

  const result = await runSync(
    {
      async readLocale(locale) {
        // import through a fresh URL so a second run in the same process re-reads the file
        const url = pathToFileURL(resolve(ROOT, LOCALE_FILES[locale])).href
        return (await import(`${url}?t=${Date.now()}`)).default
      },
      async writeLocaleSource(locale, source) {
        const file = resolve(ROOT, LOCALE_FILES[locale])
        await writeFile(file, source)
        spawnSync('bunx', ['prettier', '--write', file], {
          cwd: ROOT,
          stdio: 'inherit'
        })
      },
      async readSnapshot() {
        return readFile(resolve(ROOT, SNAPSHOT_FILE), 'utf8').catch(() => null)
      },
      async writeSnapshot(markdown) {
        const file = resolve(ROOT, SNAPSHOT_FILE)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, markdown)
      },
      fetchNotion: () => fetchNotionPages(notionToken, NOTION_SOURCES),
      complete: (messages) =>
        completeJson(messages, {
          apiKey,
          baseUrl: process.env.DEEPSEEK_BASE_URL,
          model: process.env.DEEPSEEK_MODEL
        }),
      log: (message) => console.log(`[notion-sync] ${message}`)
    },
    { dryRun }
  )

  const changed = !dryRun && result.status !== 'unchanged'
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `changed=${changed}\n`)
  }
  if (changed && process.env.NOTION_SYNC_PR_BODY) {
    const changes =
      result.status === 'updated'
        ? result.changes.map((c) => `- ${c}`).join('\n')
        : '- Notion cambió, pero nada de lo que muestra la web (solo se actualiza la copia de Notion).'
    await writeFile(
      process.env.NOTION_SYNC_PR_BODY,
      `Cambios detectados en Notion y aplicados al sitio (ES/EN):\n\n${changes}\n\n` +
        'Revisa el diff y el preview de Vercel antes de hacer merge. ' +
        '`content/notion-snapshot.md` guarda la versión de Notion usada.\n'
    )
  }
}

main().catch((error) => {
  console.error(
    `[notion-sync] ${error instanceof Error ? error.message : error}`
  )
  process.exit(1)
})
