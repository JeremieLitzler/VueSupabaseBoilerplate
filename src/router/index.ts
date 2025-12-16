// the import below requires the following line
// to be added to `env.d.ts` to register the global
// typed in the IDE.
// otherwise, there will be an TS error.
//
// <reference types="unplugin-vue-router/client" />
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const routesSkippingGetSession = [
  RouterPathEnum.Login as string,
  RouterPathEnum.Register as string,
  RouterPathEnum.KeepSupabaseAlive as string,
]
router.beforeEach(async (to, _from) => {
  // TODO > disable code below if not using dummy auth
  //const { user, setAuth } = useAuthStore()
  // setAuth({ session: { user } })
  // TODO > Enable code below handle Guest vs Authenticated users
  // Must wait for the session to be available before processing the routing...
  const authStore = useAuthStore()
  await authStore.getSession()

  const { user: authenticatedUser } = storeToRefs(authStore)
  const isAuthPage = routesSkippingGetSession.includes(to.path)

  if (!authenticatedUser.value && !isAuthPage) {
    router.push(RouterPathEnum.Login as string)
  }

  if (authenticatedUser.value && isAuthPage) {
    router.push('/')
  }
})

export default router
