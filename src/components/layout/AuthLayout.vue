<template>
  <div>
    <SideBar />
    <div
      class="flex flex-col transition-[margin]"
      :class="{ 'ml-52': menuOpen, 'ml-16': !menuOpen }"
    >
      <NavBarTop />

      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())
const { menuOpen } = useMenu()
</script>

<style scoped></style>
