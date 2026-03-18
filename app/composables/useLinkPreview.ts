const collectionMap: Record<string, string> = {
  '/chapters/': 'chapters',
  '/people/': 'people',
  '/organizations/': 'organizations',
  '/events/': 'events',
  '/essays/': 'essays',
  '/locations/': 'locations',
  '/countries/': 'countries',
  '/cities/': 'cities',
  '/notes/': 'notes',
  '/terms/': 'terms',
  '/mocs/': 'mocs',
  '/help/': 'docs',
  '/publications/': 'publications',
}

function collectionFromPath(path: string): string | null {
  for (const [prefix, collection] of Object.entries(collectionMap)) {
    if (path.startsWith(prefix)) return collection
  }
  return null
}

export function useLinkPreview() {
  const router = useRouter()

  const open = useState('link-preview-open', () => false)
  const previewPath = useState<string | null>('link-preview-path', () => null)
  const previewContent = useState<any>('link-preview-content', () => null)
  const loading = useState('link-preview-loading', () => false)

  async function openPreview(path: string) {
    const collection = collectionFromPath(path)
    if (!collection) {
      // Unknown collection — navigate normally
      router.push(path)
      return
    }

    previewPath.value = path
    previewContent.value = null
    loading.value = true
    open.value = true

    try {
      const content = await queryCollection(collection).path(path).first()
      previewContent.value = content
    } catch {
      previewContent.value = null
    } finally {
      loading.value = false
    }
  }

  function closePreview() {
    open.value = false
  }

  function navigateToPreview() {
    const path = previewPath.value
    open.value = false
    if (path) {
      router.push(path)
    }
  }

  return { open, previewPath, previewContent, loading, openPreview, closePreview, navigateToPreview }
}
