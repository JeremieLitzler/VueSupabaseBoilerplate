<script setup lang="ts">
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { formatDateStrToUserFriendly } from '@/utils/date-format'

/**
 * TODO: Passing the route path to useRoute solve the TypeScript error on accessing `slug` param
 */
const router = useRouter()
const { slug } = useRoute('/entities/[slug]').params
const store = useEntityStore()
const { entity } = storeToRefs(store)

// TODO > make sure to place the watch before the async method that load the data!
// Otherwise, the watcher never gets called
watch(
  () => entity.value?.name,
  () => {
    console.log('watch entity', entity.value)

    usePageStore().pageData.title = `Entity: ${entity.value?.name || 'Not entity found'}`
  },
)

await store.getEntity(slug)

const noSubEntities = computed(() => entity.value?.sub_entities?.length === 0)
// Update logic
const updateEntity = () => {
  store.updateEntity()
}

// Delete Logic
const deleting = ref(false)
const deleteEntity = async () => {
  deleting.value = true
  console.log('deleteEntity>deleting...')
  await store.deleteEntity()
  console.log('deleteEntity>deleted!')
  router.push('/entities')
}

// Add new sub entity logic
const openModal = ref(false)
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <FormCreateSubEntity v-model="openModal" />
    <Button
      variant="destructive"
      class="flex justify-center items-center gap-2 w-24 self-end"
      @click="deleteEntity"
    >
      <span v-if="deleting" class="animate-spin">
        <LoaderCircle />
      </span>
      <span v-else>
        <Trash2 />
      </span>
      Delete</Button
    >
    <section class="mt-4 border rounded-md w-full">
      <Table v-if="entity" class="table-container">
        <TableRow>
          <TableHead> Name </TableHead>
          <TableCell>
            <AppInputLiveEditText type="text" v-model="entity.name" @@commit="updateEntity" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Description </TableHead>
          <TableCell>
            <AppInputLiveEditText
              type="textarea"
              v-model="entity.description"
              @@commit="updateEntity"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Slug </TableHead>
          <TableCell>
            {{ entity.slug }}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead> Due Date </TableHead>
          <TableCell>
            <AppInputLiveEditText type="date" v-model="entity.due_date" @@commit="updateEntity" />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableHead> Status </TableHead>
          <!-- TODO > need to pull the valid list from the Supabase type -->
          <TableCell class="items-center">
            <AppInputLiveEditStatus v-model="entity.status" @@commit="updateEntity" />
          </TableCell>
        </TableRow>
      </Table>
    </section>
    <section v-if="entity" class="mt-2 flex flex-col w-full">
      <AppHeading heading-type="h2" class="mt-8">Sub Entities</AppHeading>
      <Button v-if="!noSubEntities" @click="openModal = !openModal" class="mb-4 w-20 self-end"
        >+ Add</Button
      >
      <div class="border table-container rounded-md">
        <article v-if="noSubEntities" class="flex flex-col items-end">
          <Button @click="openModal = !openModal" class="m-4 w-20 self-end">+ Add</Button>
          <p class="text-2xl self-center mb-4">No sub entity found.</p>
        </article>
        <Table v-else>
          <TableHeader>
            <TableRow :disable-hover="true">
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="subEntity in entity.sub_entities" :key="subEntity.id">
              <TableCell class="p-0"
                ><RouterLink
                  :to="`${RouterPathEnum.SubEntities}/${subEntity.id}`"
                  :key="subEntity.id"
                  class="text-left underline block w-full font-medium p-4"
                  >{{ subEntity.name }}</RouterLink
                ></TableCell
              >
              <TableCell
                ><AppInputLiveEditStatus
                  v-model="subEntity.status"
                  :readonly="true"
                  :show-tool-tip="false"
              /></TableCell>
              <TableCell> {{ formatDateStrToUserFriendly(subEntity.due_date) }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
