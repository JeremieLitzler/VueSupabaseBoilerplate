<script setup lang="ts">
import type { RegistrationData } from '@/types/RegistrationData'
import { signupWithEmail } from '@/services/supabase-auth'

const router = useRouter()

const signup = async (formData: RegistrationData) => {
  // Authenticate
  const { error } = await signupWithEmail({ formData })
  if (!error) return router.push('/')
}
</script>

<template>
  <div class="page-register m-4">
    <Card class="p-6 border rounded-md">
      <CardHeader>
        <CardTitle class="my-0" :is-page-title="true">Register</CardTitle>
        <CardDescription> Create a new account </CardDescription>
      </CardHeader>
      <hr class="my-8 w-full" />
      <CardContent>
        <!-- <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div> -->
        <AppRegisterForm @@register="signup" />
      </CardContent>
    </Card>
  </div>
</template>
