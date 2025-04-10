<template>
  <component
    :is="headingType"
    :class="
      cn(`w-fit brand-color-darker ${supportedHeadings[headingType]}`, $attrs['class'] as string)
    "
  >
    <slot />
  </component>
</template>
<script lang="ts">
// This script tag is required because `defineProps()` in <script setup> cannot reference locally
// declared variables because it will be hoisted outside of the setup() function. If your component
// options require initialization in the module scope, use a separate normal <script> to export the
// options instead.
const supportedHeadings = {
  h1: 'text-4xl font-extrabold my-4',
  h2: 'text-3xl font-semibold my-2',
  h3: 'text-2xl font-semibold my-2',
  h4: 'text-lg font-semibold my-1',
} as const
</script>
<script setup lang="ts">
import { cn } from '@/lib/utils'

type HeadingType = keyof typeof supportedHeadings

defineProps({
  headingType: {
    type: String as () => HeadingType,
    default: 'h2',
    validator: (value: string) => Object.keys(supportedHeadings).includes(value),
  },
})
</script>

<style scoped></style>
