import { queryCollectionSearchSections } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const collections = [
    'docs', 'chapters', 'events', 'essays', 'people',
    'organizations', 'locations', 'countries', 'cities',
    'notes', 'terms', 'mocs'
  ] as const

  const results = await Promise.allSettled(
    collections.map(c => queryCollectionSearchSections(event, c))
  )

  return results
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
    .flatMap(r => r.value)
})
