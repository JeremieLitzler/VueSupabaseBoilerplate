<script setup lang="ts">
//FormCreateSubEntity
import { Form as VeeForm } from 'vee-validate'

import type { FormDataCreateSubEntity } from '@/types/FormDataCreateSubEntity'
import type { FormSelectOption } from '@/types/FormSelectOption'

const { slug } = useRoute('/entities/[slug]').params
const sheetOpen = defineModel<boolean>()
const form = ref<FormDataCreateSubEntity>({
  name: '',
  description: '',
  entity_id: '',
  profile_id: '',
})

const selectOptions = ref({
  entities: [] as FormSelectOption[],
  profiles: [] as FormSelectOption[],
})

const authStore = useAuthStore()
const { profile: currentUser } = storeToRefs(authStore)
const entityStore = useEntityStore()
const { entities, entity } = storeToRefs(entityStore)
const profileStore = useProfileStore()
const { profiles } = storeToRefs(profileStore)
const { createSubEntity } = useSubEntityStore()
const setEntitiesOptions = async () => {
  await entityStore.getEntities()
  await entityStore.getEntity(slug)
  form.value.entity_id = entity.value?.id.toString() || ''

  if (!entities.value) return

  entities.value.forEach((entityEl) => {
    selectOptions.value.entities.push({
      label: entityEl.name,
      value: entityEl.id,
      selected: entityEl.id == entity.value?.id,
    })
  })
}

const setProfilesOptions = async () => {
  await profileStore.getProfiles()

  if (!profiles.value) return

  profiles.value.forEach((profile) => {
    selectOptions.value.profiles.push({ label: profile.full_name, value: profile.id })
  })
}

await Promise.all([setEntitiesOptions(), setProfilesOptions()])

const submitNewSubEntity = async () => {
  await createSubEntity(form.value)
  const parentSelected =
    entities.value &&
    entities.value.find((element) => element.id.toString() === form.value.entity_id)
  await entityStore.refreshEntity(parentSelected?.slug!)
  sheetOpen.value = false
}
</script>
<template>
  <AppDialog v-model="sheetOpen" @@close-modal="sheetOpen = false">
    <AppHeading heading-type="h2">Let's create a new Sub Entity</AppHeading>
    <vee-form @submit="submitNewSubEntity">
      <app-form-field
        type="text"
        name="sub_entity_name"
        v-model="form.name"
        label="Name"
        :rules="{ required: true, regex: /^(.){3,255}$/ }"
      />
      <app-form-field
        class=""
        as="select"
        name="sub_entity_profile_id"
        v-model="form.profile_id"
        label="Assignee"
        placeholder="Select an Assignee"
        rules="required"
      >
        <option value="" disabled>Select a profile</option>
        <option
          v-for="profile in selectOptions.profiles"
          :key="profile.value"
          :value="profile.value"
        >
          {{ profile.label }}
        </option></app-form-field
      >
      <app-form-field
        as="select"
        name="sub_entity_entity_id"
        v-model="form.entity_id"
        label="Entity"
        placeholder="Select an Entity"
        rules="required"
      >
        <option value="" disabled>Select an entity</option>
        <option
          v-for="entityEl in selectOptions.entities"
          :key="entityEl.value.toString()"
          :value="entityEl.value.toString()"
          :selected="entityEl.selected"
        >
          {{ entityEl.label }}
        </option>
      </app-form-field>
      <app-form-field
        as="textarea"
        name="description"
        v-model="form.description"
        label="Description"
        :rules="{ regex: /^[\s\S]{0,500}$/ }"
      />
      <Button class="mt-4" type="submit">Create</Button>
    </vee-form>
  </AppDialog>
</template>

<style scoped></style>
