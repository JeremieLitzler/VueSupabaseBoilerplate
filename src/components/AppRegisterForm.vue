<script setup lang="ts">
import type { RegistrationData } from '@/types/RegistrationData'
import AppCaptcha from '@/components/AppCaptcha.vue'
import { NotificationType } from '@/enums/NotificationType'
import type CaptchaEmitNotification from '@/types/CaptchaEmitNotification'

const formData = ref<RegistrationData>({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const captchaPassed = ref(false)
const captchaRef = ref(AppCaptcha)
const captchaErrorMessage = ref('')

const emits = defineEmits<{
  (event: '@register', request: RegistrationData): void
}>()

const notifyUserWithCaptchaResponse = (response: CaptchaEmitNotification) => {
  if (response.success) {
    captchaPassed.value = true
  } else {
    captchaPassed.value = false
    captchaErrorMessage.value = '🚧 Please resolve the captcha challenge to login.'
  }
}
const verifyCaptchaBeforeRegister = async (_values: Record<string, unknown>) => {
  if (!captchaPassed.value) {
    useNotification().addNotification({
      message: captchaErrorMessage.value,
      type: NotificationType.Error,
    })
  } else {
    register()
  }
}

const register = () => emits('@register', formData.value)
</script>
<template>
  <vee-form @submit.prevent="register">
    <app-form-field
      name="username"
      label="Username"
      v-model="formData.username"
      rules="required"
      type="text"
      placeholder="johndoe19"
    />
    <app-form-field
      name="firstName"
      label="First Name"
      v-model="formData.firstName"
      rules="required"
      type="text"
      placeholder="john"
    />
    <app-form-field
      name="lastName"
      label="Last Name"
      v-model="formData.lastName"
      rules="required"
      type="text"
      placeholder="DOE"
    />
    <app-form-field
      name="email"
      label="Email"
      v-model="formData.email"
      rules="required|email"
      type="email"
      placeholder="email@example.com"
    /><app-form-field
      name="password"
      label="Password"
      v-model="formData.password"
      rules="required"
      type="password"
      placeholder="************"
      autocomplete
    /><app-form-field
      name="confirmPassword"
      label="Confirm Password"
      v-model="formData.confirmPassword"
      rules="required"
      type="password"
      placeholder="************"
    />
    <app-captcha
      class="mt-4 overflow-hidden"
      ref="captchaRef"
      @@hcaptcha-notification="notifyUserWithCaptchaResponse"
    />
    <Button type="submit" class="mt-4">Register</Button>
    <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
  </vee-form>
  <div class="mt-4 flex flex-row items-center">
    <span class="flex-auto mr-2"> Already have an account? </span>
    <AppLink to="/login" class="p-2 rounded-md text-center underline flex-1"> Login </AppLink>
  </div>
</template>

<style scoped></style>
