import type { TocPart } from './useContentNav'

interface SurroundLink {
  path: string
  title: string
  description?: string
}

export function useChapterSurround(chapterPath: Ref<string | null | undefined>) {
  const { publicationTocs } = useContentNav()

  const surround = computed<[SurroundLink | null, SurroundLink | null]>(() => {
    if (!chapterPath.value || !publicationTocs.value) return [null, null]

    // Find which publication contains this chapter and flatten its TOC
    for (const [, toc] of Object.entries(publicationTocs.value)) {
      const flatChapters = flattenToc(toc)
      const index = flatChapters.findIndex(ch => ch.to === chapterPath.value)
      if (index === -1) continue

      const prev = index > 0 ? flatChapters[index - 1] : null
      const next = index < flatChapters.length - 1 ? flatChapters[index + 1] : null

      return [
        prev ? { path: prev.to!, title: prev.title } : null,
        next ? { path: next.to!, title: next.title } : null
      ]
    }

    return [null, null]
  })

  return { surround }
}

function flattenToc(parts: TocPart[]): Array<{ title: string, to: string }> {
  const result: Array<{ title: string, to: string }> = []
  for (const part of parts) {
    for (const ch of part.chapters) {
      if (ch.to) {
        result.push({ title: ch.title, to: ch.to })
      }
    }
  }
  return result
}
