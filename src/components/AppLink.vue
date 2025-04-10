<template>
  <!-- The little condition on `:href` is simply to make TypeScript happy  -->
  <a
    v-if="isExternal"
    :href="isExternal ? to.toString() : ''"
    target="_blank"
    rel="noopener"
    class="external-link link"
  >
    <slot></slot>
  </a>
  <!-- the `as` cast is safe but required to make TypeScript happy -->
  <router-link v-else v-bind="$props as RouterLinkProps" class="internal-link link"
    ><slot></slot
  ></router-link>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouterLinkProps } from 'vue-router'

interface AnchorLink {
  to?: string
}
// By default, the `to` property is a string with a default
const { to = '#link-not-set', ...props } = defineProps<RouterLinkProps | AnchorLink>()
const isExternal = computed(() => {
  // If we have a link that is inferred by Unplugin VueRouter, the type of `to` is object
  // RouteLocationAsRelativeTyped<RouteNamedMap, "/"> | RouteLocationAsRelativeTyped<RouteNamedMap, "/[...catchAll]"> | ... 9 more ... | RouteLocationAsPathTyped<...>
  return typeof to === 'string' && to.startsWith('http')
})
</script>
<style lang="css" scoped>
@reference '@/assets/index.css';

.router-link-active[aria-current='page'] {
  @apply bg-brand text-white hover-light-to-dark;
}
</style>
