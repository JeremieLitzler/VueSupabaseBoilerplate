<template>
  <AppHeading class="text-black">Headings</AppHeading>

  <AppHeading heading-type="h1">H1 with brand color by default</AppHeading>
  <hr />
  <AppHeading heading-type="h1" class="text-red-500">H1 with custom color</AppHeading>
  <hr />
  <AppHeading>H2</AppHeading>
  <hr />
  <AppHeading class="text-purple-500">H2</AppHeading>
  <hr />
  <AppHeading heading-type="h3" class="bg-muted">H3 default</AppHeading>
  <hr />
  <AppHeading heading-type="h3" class="my-0 bg-muted">H3 with no margin</AppHeading>
  <hr />
  <AppHeading heading-type="h3" class="my-16 bg-muted">H3 with custom margin</AppHeading>
  <hr />
  <AppHeading heading-type="h4">H4</AppHeading>
  <hr />
  <AppHeading class="text-black">Paragraphs</AppHeading>
  <p>Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph</p>
  <p>
    <span class="text-primary">primary color</span> &nbsp;
    <span class="text-primary font-bold">primary color bold</span> &nbsp;
    <span class="text-primary bg-muted">primary color over muted</span> &nbsp;
    <span class="text-white bg-brand">white over brand color</span> &nbsp;
    <span class="text-white bg-brand-darker">white over darker brand color</span> &nbsp;
  </p>
  <p>
    <span class="text-secondary bg-brand">white over brand color</span> &nbsp;
    <span class="text-secondary bg-brand-darker">white over darker brand color</span> &nbsp;
  </p>
  <p>
    <span class="text-muted bg-brand">white over brand color</span> &nbsp;
    <span class="text-muted bg-brand-darker">white over darker brand color</span> &nbsp;
  </p>

  <AppHeading class="text-black">Buttons</AppHeading>
  <Button class="my-1">a base button</Button>
  <Button class="hover:bg-muted hover:text-brand-darker my-1"
    >a base button with muted hover</Button
  >
  <Button class="bg-muted text-brand my-1">a muted button with brand color</Button>
  <Button class="bg-muted text-brand hover:bg-brand-darker hover:text-white my-1"
    >a muted button with brand color with hover</Button
  >
  <Button class="bg-muted text-brand-darker my-1">a muted button with darker brand color</Button>
  <Button class="bg-muted text-brand-darker my-1">a muted button with darker brand color</Button>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Style Guide'
</script>

<style scoped></style>
