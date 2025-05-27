<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead
    :class="
      cn('[&_tr]:border-b bg-table-header-background text-table-header-foreground', props.class)
    "
  >
    <slot />
  </thead>
</template>
