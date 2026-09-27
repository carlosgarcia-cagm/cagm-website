import en from '../../locales/en-US'
import { fillProfileValues, PROFILE, SITE_URL } from '../../utils/profile'
import { formatCv } from './chat'

/**
 * /llms.txt (https://llmstxt.org): a Markdown summary that helps AI assistants
 * and agents understand the site. Built from the same data as the website.
 */
export function buildLlmsTxt(): string {
  // the CV's own headings move two levels down to sit under "## CV"
  const cv = formatCv(en)
    .split('\n')
    .map((line) => line.replace(/^(#+) /, '##$1 '))
    .join('\n')

  return `# ${PROFILE.name} — ${en.home.title}

> ${fillProfileValues(en.home.description)}

Personal website and CV of ${PROFILE.name}, based in ${PROFILE.city}, Ecuador. Available in English (${SITE_URL}/) and Spanish (${SITE_URL}/es).

## Documents

- [Harvard CV, English (PDF)](${SITE_URL}/cv/carlos-garcia-cv-en.pdf): full CV, text-based
- [Harvard CV, Spanish (PDF)](${SITE_URL}/cv/carlos-garcia-cv-es.pdf): the same CV in Spanish
- [CV page](${SITE_URL}/cv): the CV as a web page

## Contact

- [Email](mailto:${PROFILE.email})
- [LinkedIn](${PROFILE.linkedin})
- [GitHub](${PROFILE.github})

## CV

${cv}
`
}
