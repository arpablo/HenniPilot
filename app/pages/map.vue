<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Karte', ogTitle: 'Karte' })

const [{ data: locations }, { data: cities }] = await Promise.all([
  useAsyncData('map-locations', () =>
    queryCollection('locations').select('title', 'path', 'location').all()
  ),
  useAsyncData('map-cities', () =>
    queryCollection('cities').select('title', 'path', 'location').all()
  )
])

const markers = computed(() => {
  const all = [...(locations.value ?? []), ...(cities.value ?? [])]
  return all.flatMap((item) => {
    if (!item.location || item.location.length < 2) return []
    const lat = parseFloat(item.location[0])
    const lng = parseFloat(item.location[1])
    if (isNaN(lat) || isNaN(lng)) return []
    return [{ lat, lng, title: item.title, path: item.path }]
  })
})
</script>

<template>
  <div>
    <UPageHeader title="Karte">
      <template #description>
        {{ markers.length }} georeferenzierte Einträge
      </template>
    </UPageHeader>
    <UPageBody>
      <GeoMap
        :markers="markers"
        height="600px"
      />
    </UPageBody>
  </div>
</template>
