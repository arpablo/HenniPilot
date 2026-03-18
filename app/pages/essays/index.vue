<script setup lang="ts">
definePageMeta({ layout: 'content' })
useSeoMeta({ title: 'Essays', ogTitle: 'Essays' })

const { data: items } = await useAsyncData('essays-index', () =>
  queryCollection('essays').select('title', 'path').order('title', 'ASC').all()
)
</script>

<template>
  <div>
    <UPageHeader title="Essays" />
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
