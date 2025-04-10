<script setup lang="ts">
import { formatDateStrToUserFriendly } from '@/utils/date-format'

// TODO > Be careful about the source value.
// You can't use dual-binding (v-model) with optional chaining (object?.property)
// See https://stackoverflow.com/questions/74450389/how-do-i-use-vue3-typescript-v-model-on-textfield-error-invalid-assignment/74450619#74450619
const userInput = defineModel<string | null>()
const { type = 'text' } = defineProps<{ type: string }>()
const emits = defineEmits<{
  (event: '@commit'): void
  (event: '@blur'): void
}>()

const update = () => {
  emits('@commit')
}

// Handle TextArea special case
// Paragraph that holds the current value
const readonlyEl = ref<HTMLParagraphElement>()
// Textarea where the user can edit the value
const textareaEl = ref<HTMLTextAreaElement>()
const dateEl = ref<HTMLInputElement>()
const textEl = ref<HTMLInputElement>()
// Flag used to toggle from the Paragraph to TextArea and vice-versa.
const isEditing = ref(false)
// Handle the editing start, by setting the TextArea element's rows
// property according to the Paragraph height.
const startEditing = () => {
  if (textEl.value) {
    nextTick(() => textEl.value?.focus())
    return
  }
  isEditing.value = true
  if (dateEl.value) {
    nextTick(() => dateEl.value?.focus())
    return
  }
  sizeTextArea()
}
const sizeTextArea = () => {
  const styles = window.getComputedStyle(readonlyEl.value!)
  const fontSize = parseFloat(styles.fontSize)
  const lineHeight = fontSize * 1.2
  const contentHeight = readonlyEl.value?.offsetHeight
  // console.log('startEditing>contentHeight', contentHeight)
  // console.log('startEditing>lineHeight', lineHeight)
  const rows = Math.ceil(contentHeight! / lineHeight)
  // console.log('startEditing>rows', rows)

  // Focus the textarea after it becomes visible
  // TODO > handle the blur with a v-show
  nextTick(() => {
    textareaEl.value?.focus()
    textareaEl.value?.classList.add('ring-slate-500')
    // Adjust textarea size if needed
    if (textareaEl.value && readonlyEl.value) {
      // the +1 make sure the element is high enough
      textareaEl.value.rows = rows + 1
      textareaEl.value.scrollTop = 0
      textareaEl.value.style.overflowY = 'scroll'
    }
  })
}
// Reset to readonly before emmitting update to parent component
const stopEditing = () => {
  console.log('exit editing...')

  isEditing.value = false
  emits('@commit')
}
</script>
<template>
  <!-- TODO > @keyup.enter="($event.target as HTMLInputElement).blur()" 
              requires an explicit cast of $event.target -->

  <template v-if="type === 'textarea'">
    <div class="flex">
      <p
        v-show="!isEditing"
        ref="readonlyEl"
        @click="startEditing"
        @focus="startEditing"
        tabindex="0"
        class="flex-1 readonly-input"
      >
        {{ userInput }}
      </p>
      <textarea
        v-model="userInput"
        v-show="isEditing"
        @blur="stopEditing"
        ref="textareaEl"
        class="live-textarea hover-dark-to-light focus-ring-light"
        required
      ></textarea>
      <PencilLine v-if="!isEditing" @click="startEditing" class="pencil" />
    </div>
  </template>
  <template v-else-if="type === 'date'">
    <div class="flex">
      <p
        v-show="!isEditing"
        class="flex-1"
        @click="startEditing"
        @focus="startEditing"
        tabindex="0"
      >
        {{ formatDateStrToUserFriendly(userInput) }}
      </p>
      <input
        v-model="userInput"
        v-show="isEditing"
        ref="dateEl"
        @blur="stopEditing"
        class="live-input hover-dark-to-light focus-ring-light"
        type="date"
      /><PencilLine v-if="!isEditing" @click="startEditing" class="pencil" />
    </div>
  </template>
  <div v-else class="flex">
    <input
      :type
      v-model="userInput"
      ref="textEl"
      @focusin="isEditing = !isEditing"
      @focusout="isEditing = !isEditing"
      @blur="update"
      @keyup.enter="($event.target as HTMLInputElement).blur()"
      class="live-input"
    /><PencilLine v-show="!isEditing" @click="startEditing" class="pencil" />
  </div>
</template>

<style scoped>
.readonly-input {
  white-space: pre-line;
}
.live-textarea:focus {
  border: 1px solid black;
}

@reference "@/assets/index.css";

.pencil {
  @apply text-slate-500 cursor-pointer;
}
.live-input {
  @apply w-full resize-none p-1 bg-transparent focus:outline-double focus:border-separate focus:bg-slate-100 focus:text-black focus:rounded-sm;
}

.live-textarea {
  @apply w-full text-slate-600 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded px-3.5 py-2.5 outline-none focus:bg-white;
}
</style>
