<script setup lang="ts">
console.log('NavbarTop>script:setup...')
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)

// import { useDark, useToggle } from '@vueuse/core'

// const isDark = useDark()
// const toggleDark = useToggle(isDark)
</script>
<template>
  <nav class="bg-muted/10 border-b flex justify-between items-center px-4 h-16 gap-4">
    <form class="relative h-fit">
      <Search class="text-brand absolute top-[25%] left-2" icon="lucide:search"></Search>
      <Input class="bg-muted rounded-md pl-10" type="text" placeholder="Search ..." />
    </form>
    <div class="">
      <!-- <Button @click="toggleDark()" class="w-8 h-8">
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDark" class="" icon="lucide:sun"></iconify-icon>
          <iconify-icon v-else class="" icon="lucide:moon"></iconify-icon>
        </Transition>
      </Button> -->
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
