<template>
  <h1>H1</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <h4>H4</h4>
  <p>Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph</p>
  <p class="text-primary">Primary color</p>
  <p class="text-secondary">Secondary color</p>
  <p class="text-muted">Muted color</p>
  <p class="text-accent">Accent color</p>
  <p class="text-popover">Popover color</p>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Style Guide'
</script>

<style scoped></style>
