<script setup lang="ts">
const infoElement = ref<HTMLDivElement | null>(null)
defineExpose({
  infoElement,
})
</script>
<template>
  <div ref="infoElement">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4m0-4h.01" />
      </g>
    </svg>
  </div>
</template>
