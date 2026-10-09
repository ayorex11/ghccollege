<template>
  <section class="card p-6 md:p-8 md:flex md:items-center md:gap-8 border-gold/50">
    <div class="md:flex-1">
      <h3 class="text-2xl font-semibold">Get school updates on WhatsApp</h3>
      <p class="mt-2">Term dates, events and announcements, sent straight to your phone.</p>
    </div>
    <form class="mt-4 md:mt-0 md:w-96 space-y-2" @submit.prevent="submit">
      <input v-model="name" class="input" placeholder="Your name" required />
      <input v-model="phone" class="input" placeholder="WhatsApp number" inputmode="tel" required />
      <button class="btn-wa w-full" :disabled="busy"><Icon name="chat" /> Join the list</button>
      <p v-if="done" class="text-sm text-wa font-semibold">Thank you. We have added you.</p>
      <p v-if="err" class="text-sm text-error">{{ err }}</p>
    </form>
  </section>
</template>
<script setup lang="ts">
const name = ref(''), phone = ref(''), busy = ref(false), done = ref(false), err = ref('')
async function submit() {
  busy.value = true; err.value = ''
  try {
    await useSubmit('whatsapp_signups', { name: name.value, phone: phone.value })
    done.value = true; name.value = ''; phone.value = ''
  } catch (e: any) { err.value = e.message || 'Something went wrong. Please try again.' }
  busy.value = false
}
</script>
