<template>
  <AppHeading class="text-foreground">Headings</AppHeading>

  <AppHeading heading-type="h1">H1 with brand color by default</AppHeading>
  <hr />
  <AppHeading heading-type="h1" class="text-red-500">H1 with custom color</AppHeading>
  <hr />
  <AppHeading>H2</AppHeading>
  <hr />
  <AppHeading class="text-purple-500">H2</AppHeading>
  <hr />
  <AppHeading heading-type="h3">H3 default</AppHeading>
  <hr />
  <AppHeading heading-type="h3" class="my-0">H3 with no margin</AppHeading>
  <hr />
  <AppHeading heading-type="h3" class="my-16">H3 with custom margin</AppHeading>
  <hr />
  <AppHeading heading-type="h4">H4</AppHeading>
  <hr />
  <AppHeading class="text-foreground">Paragraphs</AppHeading>
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

  <AppHeading class="text-foreground">Buttons</AppHeading>
  <Button variant="default" class="my-1">a default button</Button>
  <Button variant="secondary" class="my-1">a secondary button</Button>
  <Button variant="ghost" class="my-1">a ghost button</Button>
  <Button variant="outline" class="my-1">an outlined button</Button>
  <Button variant="link" class="my-1">a link button</Button>
  <Button variant="destructive" class="my-1">a destructive button</Button>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Style Guide'
</script>

<style scoped></style>
