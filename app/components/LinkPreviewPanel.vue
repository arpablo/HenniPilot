<script setup lang="ts">
const { open, previewContent, loading, closePreview, navigateToPreview } = useLinkPreview()
</script>

<template>
  <USlideover
    v-model:open="open"
    side="right"
    :ui="{
      content: 'w-[70vw] max-w-4xl',
    }"
  >
    <template #content>
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-default shrink-0">
          <h2 class="text-lg font-semibold truncate">
            {{ previewContent?.title || 'Laden...' }}
          </h2>
          <div class="flex items-center gap-2 shrink-0">
            <UButton
              icon="i-lucide-external-link"
              label="Seite öffnen"
              variant="soft"
              size="sm"
              @click="navigateToPreview()"
            />
            <UButton
              icon="i-lucide-x"
              variant="ghost"
              color="neutral"
              size="sm"
              @click="closePreview()"
            />
          </div>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-6 py-6">
          <div v-if="loading" class="flex items-center justify-center py-20">
            <UIcon name="i-lucide-loader-2" class="size-6 animate-spin opacity-50" />
          </div>
          <div v-else-if="previewContent">
            <UPageBody>
              <ContentRenderer :value="previewContent" />
            </UPageBody>
          </div>
          <div v-else class="text-center py-20 opacity-50">
            Inhalt konnte nicht geladen werden.
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
