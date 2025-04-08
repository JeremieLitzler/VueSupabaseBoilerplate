<script setup lang="ts">
const props = defineProps<{
  message: string
  customCode: number
  statusCode: number
  isCustomError: boolean
  nextPage?: string
}>()

console.log({ ...props })

const error = ref({
  code: 500,
  msg: 'Ops, something went wrong!',
})

if (props.isCustomError) {
  error.value.code = props.customCode || props.statusCode
  error.value.msg = props.message
} else {
  console.log('not custom error')
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = "Sorry, we couldn't find this page"
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 v-if="error.code > 0" class="error__code">{{ error.code }}</h1>

    <p class="error__msg">{{ error.msg }}</p>

    <div class="error-footer">
      <p v-if="!props.nextPage" class="error-footer__text">
        You'll find lots to explore on the home page.
      </p>
      <RouterLink v-if="!props.nextPage" to="/">
        <Button class="error__btn"> Back to homepage </Button>
      </RouterLink>
      <RouterLink v-else :to="props.nextPage">
        <Button class="error__btn"> Back </Button>
      </RouterLink>
    </div>
  </div>
</template>
