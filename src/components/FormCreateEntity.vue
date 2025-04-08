<script setup lang="ts">
import { slugify } from '@/utils/slugify'
import { Form as VeeForm } from 'vee-validate'

import type { FormDataCreateEntity } from '@/types/FormDataCreateEntity'

const sheetOpen = defineModel<boolean>()
const form = ref<FormDataCreateEntity>({ name: '', slug: '', description: '' })

const authStore = useAuthStore()
const { profile: currentUser } = storeToRefs(authStore)
const { createEntity } = useEntityStore()

// Fill in the slug as the name is typed
let userEditedSlug = ref(false)
const updateSlug = () => {
  if (!form.value?.name) return
  if (!userEditedSlug.value) {
    form.value.slug = slugify(form.value.name)
  }
}
const enterSlugEditing = () => (userEditedSlug.value = true)
const exitSlugEditing = () => {
  const computedSlug = slugify(form.value.name)
  if (form.value.slug === '') {
    userEditedSlug.value = false
  } else if (form.value.slug !== computedSlug) {
    // since the slug is different from the computed slug from name
    // the auto computation of the slug is disabled
    userEditedSlug.value = true
    return
  } else {
    // since the slug is the same from the computed slug from name
    // the auto computation of the slug is enabled
    userEditedSlug.value = false
    return
  }
}
// Handle new Entity creation
const submitNewEntity = async () => {
  await createEntity(form.value)
  sheetOpen.value = false
}
</script>
<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Let's create a new Entity</SheetTitle>
      </SheetHeader>
      <vee-form @submit="submitNewEntity">
        <app-form-field
          type="text"
          name="entity_name"
          v-model="form.name"
          label="Name"
          :rules="{ required: true, regex: /^(.){3,60}$/ }"
          @input="updateSlug"
        />
        <app-form-field
          type="text"
          name="entity_slug"
          v-model="form.slug"
          label="Slug"
          :rules="{ required: true, regex: /^([a-z0-9-]){3,60}$/ }"
          @focusin="enterSlugEditing"
          @blur="exitSlugEditing"
        />
        <app-form-field
          as="textarea"
          name="entity_description"
          v-model="form.description"
          label="Description"
          :rules="{ regex: /^[\s\S]{0,500}$/ }"
        />
        <Button type="submit" class="btn btn-primary">Create</Button>
      </vee-form>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
