<script setup lang="ts">
console.log('NavbarTop>script:setup...')
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <nav class="border-b flex justify-between items-center px-4 h-16 gap-4">
    <form class="relative h-fit">
      <Search class="absolute top-[20%] left-2" icon="lucide:search"></Search>
      <Input class="bg-brand-lighter rounded-md pl-10" type="text" placeholder="Search ..." />
    </form>
    <div class="flex items-center gap-2">
      <Button @click="toggleDark()" class="p-0 w-8 h-8 flex items-center justify-center">
        <Transition name="scale" mode="out-in">
          <SunMedium v-if="isDark" class=""></SunMedium>

          <Moon v-else class="" icon="lucide:moon"></Moon>
        </Transition>
      </Button>
      <div class="w-8">
        <AppAvatar :profile="profile" />
        <!-- <DropdownMenu>
          <DropdownMenuTrigger>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              ><RouterLink
                :to="{ name: '/profiles/[username]', params: { username: profile?.username! } }"
                >Profile</RouterLink
              ></DropdownMenuItem
            >
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> -->
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
