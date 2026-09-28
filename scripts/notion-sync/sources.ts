/**
 * Notion pages the website is built from. The CV page decides what is in the
 * active CV; the detail pages add the descriptions of each role.
 * Share each page (or a parent page) with the Notion integration of NOTION_TOKEN.
 */
export const NOTION_SOURCES = [
  { id: '3a634bc5-38c2-810f-8e6c-d36cc9d6e02f', label: 'CV — Carlos García' },
  {
    id: '33134bc5-38c2-8197-b114-c79c38eae419',
    label: 'Roi Studio — Zainar Location Platform (ZLP)'
  },
  {
    id: '3b334bc5-38c2-8180-b6fa-d0ef92993f4a',
    label: 'Roi Studio — OSS (IEP)'
  },
  {
    id: '3a634bc5-38c2-814c-bc0f-c19040f93e30',
    label: 'Roi Studio — Productividad Empresarial'
  },
  { id: '3a634bc5-38c2-810d-a445-e75ffe4c136b', label: 'Lanubetv S.A.' },
  { id: '3a634bc5-38c2-8102-badf-c3601c15b660', label: 'Nextgen S.A.' }
] as const
