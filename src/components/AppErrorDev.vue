<script setup lang="ts">
import AppHeading from './AppHeading.vue'

defineProps<{
  message: string
  customCode: number
  code: string
  statusCode: number
  hint: string | null
  details: string
  nextPage: string
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <AppHeading heading-type="h1" class="error__code" v-if="statusCode"
      >Status Code: {{ statusCode }}</AppHeading
    >
    <AppHeading class="error__msg">{{ message }}</AppHeading>
    <p>Custom code: {{ customCode || code }}</p>
    <p v-if="hint">Hint: {{ hint }}</p>
    <p v-if="details">Details: {{ details }}</p>
    <div class="error-footer">
      <RouterLink v-if="!nextPage" to="/">
        <Button class="error__btn"> Back to homepage </Button>
      </RouterLink>
      <RouterLink v-else :to="nextPage">
        <Button class="error__btn"> Back </Button>
      </RouterLink>
    </div>
  </div>
</template>
