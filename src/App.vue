<script setup lang="ts">
const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
onMounted(async () => {
  authStore.trackAuthChanges()
})
onErrorCaptured((error) => {
  errorStore.setError({ error })
})

const AuthLayout = defineAsyncComponent(() => import('@/components/layout/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/layout/GuestLayout.vue'))
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Suspense>
      <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
        <AppError v-if="activeError" />
        <RouterView v-else v-slot="{ Component, route }">
          <Transition name="fade" mode="out-in">
            <div class="sfc-app" :key="route.path">
              <Suspense v-if="Component" :timeout="0">
                <!-- With Suspence, the current component remains loaded until
                  the next is loaded.
                  
                  If it is not what you want, the "timeout" prop on Suspense tell to load 
                  the fallback until the next component is ready
                  -->
                <Component :is="Component" />
                <template #fallback>
                  <AppLoader />
                </template>
              </Suspense>
            </div>
          </Transition>
        </RouterView>
      </Component>
      <template #fallback>
        <AppLoader />
      </template>
    </Suspense>
  </Transition>
</template>
<style lang="css" scoped>
.v-enter-active,
v-leave-active {
  transition: transform 0.2s;
}

.v-enter-from,
v-leave-to {
  transform: scale(0.3);
}
</style>
