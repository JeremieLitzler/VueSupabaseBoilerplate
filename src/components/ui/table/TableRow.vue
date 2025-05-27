<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    disableHover?: boolean
  }>(),
  {
    disableHover: false,
  },
)
</script>

<template>
  <tr
    :class="
      cn(
        `border-b transition-colors data-[state=selected]:bg-muted 
        ${disableHover ? '' : 'hover:bg-table-mouse-background hover:text-table-mouse-foreground'}`,
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
