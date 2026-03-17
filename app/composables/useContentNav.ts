export function useContentNav() {
  const { data: helpPages } = useAsyncData('help-nav', () =>
    queryCollection('docs').select('title', 'path').order('path', 'ASC').all()
  )

  const { data: publications } = useAsyncData('pub-nav', () =>
    queryCollection('publications').select('title', 'path', 'subtitle').order('title', 'ASC').all()
  )

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

  return { contentItems, helpPages, publications }
}
