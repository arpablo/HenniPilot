<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Ereignisse', ogTitle: 'Ereignisse' })

const { data: items } = await useAsyncData('events-index', () =>
  queryCollection('events')
    .select('title', 'path', 'start')
    .order('start', 'ASC')
    .all()
)
</script>

<template>
  <div>
    <UPageHeader title="Ereignisse" />
    <UPageBody>
      <ul class="space-y-2">
        <li
          v-for="item in items"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="hover:underline"
          >
            <span
              v-if="item.start"
              class="text-sm text-muted mr-2"
            >{{ item.start?.slice(0, 4) }}</span>{{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
