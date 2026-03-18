<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'

// Fix Leaflet's broken default icon paths in Vite/Nuxt
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

interface Marker {
  lat: number
  lng: number
  title: string
  path?: string
}

const props = withDefaults(defineProps<{
  markers: Marker[]
  height?: string
  zoom?: number
}>(), {
  height: '350px',
  zoom: 9
})

const center = computed((): [number, number] => {
  if (props.markers.length === 0) return [30, 45]
  if (props.markers.length === 1) return [props.markers[0]!.lat, props.markers[0]!.lng]
  const lats = props.markers.map(m => m.lat)
  const lngs = props.markers.map(m => m.lng)
  return [
    (Math.min(...lats) + Math.max(...lats)) / 2,
    (Math.min(...lngs) + Math.max(...lngs)) / 2
  ]
})

const zoom = computed(() => props.markers.length === 1 ? props.zoom : 5)

const mapRef = ref()

function onMapReady() {
  if (props.markers.length > 1 && mapRef.value?.leafletObject) {
    const lats = props.markers.map(m => m.lat)
    const lngs = props.markers.map(m => m.lng)
    mapRef.value.leafletObject.fitBounds([
      [Math.min(...lats) - 1, Math.min(...lngs) - 1],
      [Math.max(...lats) + 1, Math.max(...lngs) + 1]
    ])
  }
}
</script>

<template>
  <div
    :style="`height: ${height}`"
    class="rounded-lg border border-[var(--ui-border)]"
  >
    <LMap
      ref="mapRef"
      :zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      style="height: 100%; width: 100%; border-radius: inherit;"
      @ready="onMapReady"
    >
      <LTileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles © Esri — Source: Esri, DeLorme, NAVTEQ"
      />
      <LMarker
        v-for="marker in markers"
        :key="`${marker.lat}-${marker.lng}`"
        :lat-lng="[marker.lat, marker.lng]"
      >
        <LPopup>
          <NuxtLink
            v-if="marker.path"
            :to="marker.path"
            class="font-semibold hover:underline"
            style="color: var(--color-link)"
          >
            {{ marker.title }}
          </NuxtLink>
          <span
            v-else
            class="font-semibold"
          >{{ marker.title }}</span>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>
