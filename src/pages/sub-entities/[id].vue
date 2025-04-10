<script setup lang="ts">
import { formatDateStrToUserFriendly } from '@/utils/date-format'

const router = useRouter()
const { id } = useRoute('/sub-entities/[id]').params
const store = useSubEntityStore()
const entityStore = useEntityStore()

const { subEntity } = storeToRefs(store)

watch(
  () => subEntity.value?.name,
  () => {
    console.log('watch sub-entity', subEntity.value)

    usePageStore().pageData.title = `Sub-Entity: ${subEntity.value?.name || 'Not Sub-Entity found'}`
  },
)

await store.getSubEntity(id)
const formattedDueDate = computed(() => formatDateStrToUserFriendly(subEntity.value?.due_date))
// Update logic
const updateSubEntity = async () => {
  console.log('updateSubEntity triggered', subEntity.value)

  store.updateSubEntity()
  await entityStore.refreshEntity(subEntity.value?.entities?.slug ?? '')
}

// Delete Logic
const deleting = ref(false)
const deleteSubEntity = async () => {
  const parentSlug = subEntity.value?.entities?.slug
  deleting.value = true
  console.log('deleteSubEntity>deleting...')
  await store.deleteSubEntity()
  console.log('deleteSubEntity>deleted!')
  await entityStore.refreshEntity(parentSlug!)
  router.push(`/entities/${parentSlug}`)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Button
      class="btn-destructive flex justify-center items-center gap-2 w-24 self-end"
      @click="deleteSubEntity"
    >
      <span v-if="deleting" class="mr-0 animate-spin">
        <LoaderCircle />
      </span>
      <span v-else class="text-white mr-0">
        <Trash2 />
      </span>
      Delete</Button
    >
    <section class="mt-4 border rounded-md w-full">
      <Table v-if="subEntity">
        <TableRow>
          <TableHead> Name </TableHead>
          <TableCell>
            <AppInputLiveEditText type="text" v-model="subEntity.name" @@commit="updateSubEntity" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Description </TableHead>
          <TableCell>
            <AppInputLiveEditText
              type="textarea"
              v-model="subEntity.description"
              @@commit="updateSubEntity"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Due Date </TableHead>
          <TableCell>
            <AppInputLiveEditText
              type="date"
              v-model="subEntity.due_date"
              @@commit="updateSubEntity"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Status </TableHead>
          <TableCell>
            <AppInputLiveEditStatus v-model="subEntity.status" @@commit="updateSubEntity" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Entity </TableHead>
          <TableCell>
            <RouterLink
              class="underline hover:bg-muted block w-full font-medium"
              :to="`/entities/${subEntity.entities?.slug}`"
              >{{ subEntity.entities?.name }}</RouterLink
            >
          </TableCell>
        </TableRow>
      </Table>
    </section>
  </div>
</template>

<style scoped></style>
