<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
    :class="{ 'w-52': menuOpen, 'w-16': !menuOpen }"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button tabindex="0" variant="outline" size="icon" class="w-8 h-8" @click="toggleMenu">
        <Menu />
      </Button>

      <!-- <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            tabindex="0"
            class="w-8 h-8 hover:ring-offset-2 hover:ring-2 focus:ring-offset-2 focus:ring-2"
            variant="outline"
            size="icon"
          >
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Create</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer" @click="$emit('@createProject')">
            A Project
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer" @click="$emit('@createTask')">
            A Task</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu> -->
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideBarLinks :links="topLinks" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideBarLinks :links="settingsLinks" @@action-clicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { LinkProp } from '@/types/LinkProp'
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { SideBarActionsEnum } from '@/types/SideBarActionsEnum'
import type { SideBarLinkAction } from '@/types/SideBarLinkAction'
import router from '@/router'
import { useWindowSize } from '@vueuse/core'
import Home from '../ui/icon/Home.vue'
import Files from '../ui/icon/Files.vue'
import UserRoundCog from '../ui/icon/UserRoundCog.vue'
import LogOut from '../ui/icon/LogOut.vue'
import Settings2 from '../ui/icon/Settings2.vue'
import PaintBrush from '../ui/icon/PaintBrush.vue'

console.log('SideBar>script:setup...')

const executeAction = async (payload: SideBarLinkAction) => {
  console.log('Clicked a side bar link', payload)

  if (payload.action === SideBarActionsEnum.Logout) {
    const { isLoggedOut } = await useAuthStore().logout()
    if (isLoggedOut) {
      console.log('Logging out...')
      router.push('/login')
    }
  }
}

defineEmits<{ (event: '@createTask'): void; (event: '@createProject'): void }>()

const { useAuthStore } = await import('@/stores/auth')
const authStore = useAuthStore()
// TODO > enable this if querying supabase
await authStore.getSession()
// TODO > remove this if querying supabase
// await authStore.setAuth({
//   session: {
//     user: authStore.user!,
//     // all the following is required to avoid a typescript error
//     access_token: '',
//     expires_in: 0,
//     refresh_token: '',
//     token_type: '',
//   },
const { profile } = storeToRefs(authStore)
// })
const topLinks: LinkProp[] = [
  {
    to: RouterPathEnum.Home,
    icon: Home,
    label: 'Dashboard',
  },
  { to: RouterPathEnum.Entities, icon: Files, label: 'Entities' },
  { to: RouterPathEnum.StyleGuide, icon: PaintBrush, label: 'Style Guide' },
]
const settingsLinks: LinkProp[] = [
  {
    //TODO > username is undefined
    to: `${RouterPathEnum.Profile}s/${profile?.value?.username}`,
    icon: UserRoundCog,
    label: 'Profile',
  },
  { to: RouterPathEnum.Settings, icon: Settings2, label: 'Settings' },
  {
    icon: LogOut,
    action: SideBarActionsEnum.Logout,
    label: 'Sign out',
  },
]

const { menuOpen, toggleMenu } = useMenu()

const { width: windowWidth } = useWindowSize()
watchEffect(() => {
  if (windowWidth.value > 1024) {
    menuOpen.value = true
  } else {
    menuOpen.value = false
  }
})
</script>
<style scoped></style>
