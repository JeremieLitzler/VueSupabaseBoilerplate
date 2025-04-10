<template>
  <template v-for="link in links" :key="link.to">
    <AppLink
      v-if="!link.action"
      :to="link.to"
      class="side-bar-link hover-dark-to-light focus-ring-dark"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      :title="link.label"
    >
      <component :is="link.icon"></component>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.label
      }}</span>
    </AppLink>
    <Button
      v-else
      class="side-bar-link hover-dark-to-light focus-ring-light"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="actionClicked(link.action)"
      :title="link.label"
    >
      <component :is="link.icon"></component>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.label
      }}</span>
    </Button>
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
