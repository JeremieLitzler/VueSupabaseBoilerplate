<script setup lang="ts">
import { StoreCacheKey } from '@/types/StoreCacheKeys'

usePageStore().pageData.title = 'Settings'
type CacheType = {
  name: string
  key: string | StoreCacheKey
}

const caches = [
  { name: 'Profiles', key: StoreCacheKey.AllProfiles },
  { name: 'Entities', key: StoreCacheKey.AllEntities },
]

const profileStore = useProfileStore()
const entityStore = useEntityStore()

const purge = (cache: CacheType) => {
  console.info('purge', cache)

  if (cache.key === StoreCacheKey.AllProfiles) {
    console.info('purge>match', cache.key)
    profileStore.clearCache()
  }
  if (cache.key === StoreCacheKey.AllEntities) {
    console.info('purge>match', cache.key)
    entityStore.clearCache()
  }
}
</script>
<template>
  <section>
    <AppHeading>Cache Control</AppHeading>
    <Button v-for="cache in caches" :key="cache.key" @click="purge(cache)"
      >Invalidate {{ cache.name }}</Button
    >
  </section>
</template>

<style scoped></style>
