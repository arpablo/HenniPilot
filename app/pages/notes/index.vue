<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Notizen', ogTitle: 'Notizen' })

const { data: items } = await useAsyncData('notes-index', () =>
  queryCollection('notes').select('title', 'path').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Notizen" />
    <UPageBody>
      <ul class="space-y-2">
        <li
          v-for="item in items"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="hover:underline"
          >{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </UPageBody>
  </div>
</template>
