export type SectionKey = 'publikationen' | 'materialien' | 'hilfe'

export function useSidebarState() {
  const route = useRoute()

  const activeSection = useState<SectionKey>('sidebar-section', () => 'publikationen')
  const selectedPublication = useState<string | null>('sidebar-pub', () => null)

  const router = useRouter()

  // Pages that have a sidebar layout
  const sidebarPaths = ['/publications', '/chapters', '/events', '/essays', '/people', '/organizations', '/locations', '/countries', '/cities', '/notes', '/terms', '/mocs', '/help']

  function hasSidebar(path: string): boolean {
    return sidebarPaths.some(p => path.startsWith(p))
  }

  const defaultRoutes: Record<SectionKey, string> = {
    publikationen: '/publications',
    materialien: '/chapters',
    hilfe: '/help/getting-started'
  }

  function setSection(key: SectionKey) {
    activeSection.value = key
    selectedPublication.value = null
    // Always navigate to the default page for the selected section
    router.push(defaultRoutes[key])
  }

  function selectPublication(pubPath: string) {
    selectedPublication.value = pubPath
  }

  function backToList() {
    selectedPublication.value = null
  }

  watch(() => route.path, (path) => {
    if (path.startsWith('/publications/')) {
      activeSection.value = 'publikationen'
      selectedPublication.value = path
    } else if (path.startsWith('/help/')) {
      activeSection.value = 'hilfe'
    } else if (path.startsWith('/chapters/')) {
      // Keep publication TOC open if a chapter is being viewed
      if (!selectedPublication.value) {
        activeSection.value = 'materialien'
      }
    } else if (path === '/') {
      activeSection.value = 'publikationen'
    } else {
      activeSection.value = 'materialien'
    }
  }, { immediate: true })

  return { activeSection, selectedPublication, setSection, selectPublication, backToList }
}
