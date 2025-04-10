<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  isPageTitle?: boolean
}>()
</script>

<template>
  <AppHeading heading-type="h1" v-if="props.isPageTitle" :class="cn('sfc-card-title', props.class)">
    <slot />
  </AppHeading heading-type="h1">
  <AppHeading heading-type="h3" v-else :class="cn('sfc-card-title', props.class)">
    <slot />
  </AppHeading heading-type="h3">
</template>
