<script setup lang="ts">
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
    <h1 class="error__code" v-if="statusCode">Status Code: {{ statusCode }}</h1>
    <h2 class="error__msg">{{ message }}</h2>
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
