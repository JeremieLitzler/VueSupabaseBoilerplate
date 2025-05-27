<template>
  <div class="flex flex-col">
    <div class="flex justify-end w-24 self-end">
      <Button class="mb-4" @click="openModal = !openModal">+ Add</Button>
    </div>
    <DataTable v-if="entities" :columns :data="entities" />
  </div>
  <FormCreateEntity v-model="openModal" />
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Entities'

import { columns } from '@/utils/datatable-columns-entity'

const entityStore = useEntityStore()
const { entities } = storeToRefs(entityStore)
// `entities` is reactive from the store.
// as soon as the `getEntities` is called and done,
// the entities are loaded
await entityStore.getEntities()

// Add new sub entity logic
const openModal = ref(false)
</script>

<style scoped></style>
