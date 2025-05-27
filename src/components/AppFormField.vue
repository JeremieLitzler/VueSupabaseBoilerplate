<template>
  <div class="flex flex-col mt-4">
    <label class="label self-start pb-2" :for="name">{{ label }}</label>
    <vee-field
      v-if="as"
      :as
      :name="name"
      :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)"
      :id="name"
      v-bind="$attrs"
      class="field"
      ><slot
    /></vee-field>
    <vee-field
      v-else
      :name="name"
      :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)"
      :id="name"
      v-bind="$attrs"
      class="field"
    />
    <vee-error-message :name="name" class="self-start text-xs text-red-500" />
  </div>
</template>

<script setup lang="ts">
interface AppFormFieldProps {
  as?: string
  name: string
  label: string
  modelValue?: string
}

const { name, label, modelValue = '' } = defineProps<AppFormFieldProps>()
</script>

<style scoped></style>
