<script setup lang="ts">
import { loginWithSupabase } from '@/services/supabase-auth'
import AppLoginForm from '@/components/AppLoginForm.vue'
import type UserLoginRequest from '@/types/UserLoginRequest'

const router = useRouter()

const sigin = async (request: UserLoginRequest) => {
  const { error } = await loginWithSupabase({ formData: request })
  if (!error) return router.push('/')
}
</script>

<template>
  <div class="page-login m-4">
    <Card class="p-6 border rounded-md">
      <CardHeader>
        <CardTitle class="my-0" :is-page-title="true"> Login </CardTitle>
        <CardDescription> Use your credentials to login to your account </CardDescription>
      </CardHeader>
      <hr class="my-8 w-full" />
      <CardContent>
        <AppLoginForm @@login="sigin" />
      </CardContent>
    </Card>
  </div>
</template>
