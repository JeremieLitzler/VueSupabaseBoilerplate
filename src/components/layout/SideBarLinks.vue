<template>
  <template v-for="link in links" :key="link.to">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exact-active-class="text-black"
      class="side-bar-link"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      :title="link.label"
    >
      <component :is="link.icon"></component>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.label
      }}</span>
    </RouterLink>
    <a
      v-else
      class="side-bar-link cursor-pointer w-full mx-0 lg:mx-2"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="actionClicked(link.action)"
      :title="link.label"
    >
      <component :is="link.icon"></component>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.label
      }}</span>
    </a>
  </template>
</template>

<script setup lang="ts">
import type { LinkProp } from '@/types/LinkProp'
import type { SideBarActionsEnum } from '@/types/SideBarActionsEnum'
import type { SideBarLinkAction } from '@/types/SideBarLinkAction'
const emits = defineEmits<{
  (event: '@actionClicked', entry: SideBarLinkAction): void
  // '@actionClicked': [SideBarLinkAction]
}>()
const actionClicked = (action: SideBarActionsEnum | undefined) =>
  emits('@actionClicked', { action })

const { links } = defineProps<{
  links: LinkProp[]
}>()

const { menuOpen } = useMenu()
</script>
<style lang="css" scoped>
.router-link-active[aria-current='page'] {
  color: black;
}
</style>
