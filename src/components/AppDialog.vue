<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount, onMounted } from 'vue'

const sheetOpen = defineModel<boolean>()

const emit = defineEmits(['update:sheetOpen'])

const dialogRef = ref<HTMLDialogElement | null>(null)
let lastFocusedElement: HTMLElement | null = null

// Debug the initial value
onMounted(() => {
  console.log('AppDialog mounted - initial sheetOpen value:', sheetOpen.value)
  // Force dialog to be closed initially
  if (dialogRef.value) {
    if (dialogRef.value.open) {
      console.log('Dialog was open on mount, force closing it')
      dialogRef.value.close()
    }
    // Double check - if sheetOpen is not explicitly true, keep it closed
    if (sheetOpen.value !== true) {
      dialogRef.value.close()
    }
  }
})

function getFocusableElements() {
  if (!dialogRef.value) return []
  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function trapFocus(e: KeyboardEvent) {
  if (e.key !== 'Tab' || !dialogRef.value?.open) return
  const focusableEls = getFocusableElements()
  if (!focusableEls.length) return
  const first = focusableEls[0]
  const last = focusableEls[focusableEls.length - 1]
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

function openDialog() {
  console.log('AppDialog>calling openDialog')

  lastFocusedElement = document.activeElement as HTMLElement
  dialogRef.value?.showModal()
  nextTick(() => {
    // Focus the first focusable element (e.g., close button)
    const els = getFocusableElements()
    if (els.length) els[0].focus()
  })
  document.addEventListener('keydown', trapFocus)
}

function closeDialog() {
  console.log('AppDialog>calling closeDialog')
  dialogRef.value?.close()
  document.removeEventListener('keydown', trapFocus)
  if (lastFocusedElement) lastFocusedElement.focus()
  sheetOpen.value = false
}

// Watch prop to open/close dialog
watch(
  () => sheetOpen.value,
  (open, oldOpen) => {
    console.log('AppDialog>watch>open:', open, 'oldOpen:', oldOpen)

    if (open === true && !dialogRef.value?.open) {
      openDialog()
    } else if (open === false && dialogRef.value?.open) {
      closeDialog()
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', trapFocus)
})
</script>

<template>
  <dialog :class="{ modal: sheetOpen }" ref="dialogRef" @close="closeDialog">
    <form method="dialog" class="self-end p-4">
      <Button variant="ghost" autofocus type="submit" aria-label="Close dialog"> <X></X> </Button>
    </form>
    <div class="self-center p-4 w-lg">
      <slot></slot>
    </div>
  </dialog>
</template>
