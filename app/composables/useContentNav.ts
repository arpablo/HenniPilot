export function useContentNav() {
  const { data: helpPages } = useAsyncData('help-nav', () =>
    queryCollection('docs').select('title', 'path').order('path', 'ASC').all()
  )

  const { data: publications } = useAsyncData('pub-nav', () =>
    queryCollection('publications').select('title', 'path', 'subtitle').order('title', 'ASC').all()
  )

  const { data: publicationTocs } = useAsyncData('pub-tocs', async () => {
    // Fetch all chapter titles for path→title mapping
    const chapters = await queryCollection('chapters').select('title', 'path').all()
    const chapterTitles: Record<string, string> = {}
    for (const ch of chapters) {
      chapterTitles[ch.path] = ch.title
    }

    const pubs = await queryCollection('publications').select('path').order('title', 'ASC').all()
    const tocs: Record<string, TocPart[]> = {}
    for (const pub of pubs) {
      const full = await queryCollection('publications').path(pub.path).first()
      tocs[pub.path] = extractTocParts(full?.body, chapterTitles)
    }
    return tocs
  })

  const contentItems = [
    { label: 'Kapitel', icon: 'i-lucide-book-open', to: '/chapters' },
    { label: 'Ereignisse', icon: 'i-lucide-calendar-clock', to: '/events' },
    { label: 'Essays', icon: 'i-lucide-pen-line', to: '/essays' },
    { label: 'Personen', icon: 'i-lucide-users', to: '/people' },
    { label: 'Organisationen', icon: 'i-lucide-building-2', to: '/organizations' },
    { label: 'Orte', icon: 'i-lucide-map-pin', to: '/locations' },
    { label: 'Länder', icon: 'i-lucide-globe', to: '/countries' },
    { label: 'Städte', icon: 'i-lucide-landmark', to: '/cities' },
    { label: 'Notizen', icon: 'i-lucide-notebook-text', to: '/notes' },
    { label: 'Begriffe', icon: 'i-lucide-book-marked', to: '/terms' },
    { label: 'Maps of Content', icon: 'i-lucide-map', to: '/mocs' },
    { label: 'Karte', icon: 'i-lucide-globe-2', to: '/map' },
  ]

  return { contentItems, helpPages, publications, publicationTocs }
}

// Minimark format: ["tag", {props}, ...children] where strings are text nodes
// body.value is the root array containing the tree

export interface TocChapter {
  title: string
  to: string | null
}

export interface TocPart {
  title: string
  chapters: TocChapter[]
}

function extractTocParts(body: any, chapterTitles: Record<string, string>): TocPart[] {
  if (!body?.value) return []

  const rootList = findNode(body.value, (tag: string) => tag === 'ul' || tag === 'ol')
  if (!rootList) return []

  return rootList.slice(2)
    .filter((child: any) => Array.isArray(child) && child[0] === 'li')
    .map((li: any) => {
      const title = li.slice(2)
        .filter((c: any) => typeof c === 'string')
        .join('')
        .trim()
        .replace(/\n[\s\S]*$/, '')

      const subList = li.slice(2).find((c: any) => Array.isArray(c) && (c[0] === 'ul' || c[0] === 'ol'))
      const chapters: TocChapter[] = subList
        ? subList.slice(2)
            .filter((c: any) => Array.isArray(c) && c[0] === 'li')
            .map((chLi: any) => extractChapter(chLi, chapterTitles))
        : []

      return { title, chapters }
    })
    .filter((p: TocPart) => p.title)
}

function extractChapter(li: any, chapterTitles: Record<string, string>): TocChapter {
  const children = li.slice(2)
  const link = children.find((c: any) => Array.isArray(c) && c[0] === 'a')
  if (link) {
    const href = link[1]?.href || null
    // Use the real title from the chapter's frontmatter if available
    const title = (href && chapterTitles[href]) || link.slice(2).filter((c: any) => typeof c === 'string').join('').trim()
    return { title, to: href }
  }
  const title = children.filter((c: any) => typeof c === 'string').join('').trim()
  return { title, to: null }
}

function findNode(nodes: any, predicate: (tag: string) => boolean): any | null {
  if (!Array.isArray(nodes)) return null
  if (typeof nodes[0] === 'string' && predicate(nodes[0])) return nodes
  for (const child of nodes) {
    if (Array.isArray(child)) {
      const found = findNode(child, predicate)
      if (found) return found
    }
  }
  return null
}
