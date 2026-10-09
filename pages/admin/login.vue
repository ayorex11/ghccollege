<template>
  <div class="min-h-screen grid place-items-center bg-ivory p-4">
    <form class="card w-full max-w-sm p-6 space-y-4" @submit.prevent="login">
      <div class="text-center"><img src="/logo.jpg" alt="" class="mx-auto h-16" /><h1 class="mt-2 text-2xl font-semibold">Admin sign in</h1></div>
      <label class="block text-sm font-semibold">Email<input v-model="email" type="email" class="input mt-1" required autocomplete="username" /></label>
      <label class="block text-sm font-semibold">Password<input v-model="password" type="password" class="input mt-1" required autocomplete="current-password" /></label>
      <button class="btn-primary w-full" :disabled="busy">Sign in</button>
      <p v-if="err" class="text-sm text-error">{{ err }}</p>
    </form>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Admin sign in', meta: [{ name: 'robots', content: 'noindex' }] })
const email = ref(''), password = ref(''), busy = ref(false), err = ref('')
async function login() {
  busy.value = true; err.value = ''
  const { error } = await useNuxtApp().$supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  busy.value = false
  if (error) err.value = 'Email or password is not correct.'
  else navigateTo('/admin')
}
</script>
