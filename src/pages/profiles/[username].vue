<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p class="mt-2 text-gray-500">@{{ profile?.username }}</p>
      <AppHeading heading-type="h1" class="mt-5">{{ profile?.full_name }}</AppHeading>
      <p class="">{{ profile?.bio }}</p>
    </div>
    <Button>Edit profile</Button>
  </div>
</template>

<script setup lang="ts">
usePageStore().pageData = { title: '' }

const { username } = useRoute('/profiles/[username]').params
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)
await profileStore.getProfile({ column: 'username', value: username })
</script>

<style scoped></style>
