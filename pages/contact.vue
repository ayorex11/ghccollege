<template>
  <div>
    <PageHero title="Contact us" intro="The quickest way to reach the school is WhatsApp." />
    <section class="wrap section grid gap-8 lg:grid-cols-2">
      <div class="space-y-4">
        <a :href="wa()" target="_blank" rel="noopener" class="btn-wa w-full"><Icon name="chat" /> Chat on WhatsApp</a>
        <div class="card p-5 space-y-3">
          <p class="flex gap-3"><Icon name="location_on" class="text-maroon" /><span>{{ settings.addressLines.join(' ') }}</span></p>
          <p class="flex gap-3"><Icon name="call" class="text-maroon" /><a :href="`tel:${settings.phone.replace(/\s/g,'')}`">{{ settings.phone }}</a></p>
          <p class="flex gap-3"><Icon name="mail" class="text-maroon" /><a :href="`mailto:${settings.email}`" class="break-all">{{ settings.email }}</a></p>
        </div>
        <a :href="settings.mapsLink" target="_blank" rel="noopener" class="btn-outline w-full"><Icon name="directions" /> Get directions</a>
      </div>
      <form class="card p-6 space-y-3" @submit.prevent="send">
        <h2 class="text-2xl font-semibold">Send a message</h2>
        <label class="block text-sm font-semibold">Name<input v-model="f.name" class="input mt-1" required /></label>
        <label class="block text-sm font-semibold">Phone or email<input v-model="f.contact" class="input mt-1" required /></label>
        <label class="block text-sm font-semibold">Message<textarea v-model="f.message" rows="5" class="input mt-1" required /></label>
        <button class="btn-primary w-full" :disabled="busy">Send message</button>
        <p v-if="done" class="text-sm font-semibold text-wa">Message sent. We will reply soon.</p>
        <p v-if="err" class="text-sm text-error">{{ err }}</p>
      </form>
    </section>
    <section class="wrap pb-10">
      <iframe :src="settings.mapsEmbed" class="h-80 w-full rounded-card border border-line" loading="lazy" title="Map showing Goldenheart College" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { settings, wa } from '~/data/site'
useSeo('Contact', 'Address, phone, WhatsApp and directions for Goldenheart College, Abeokuta.')
const f = reactive({ name: '', contact: '', message: '' })
const busy = ref(false), done = ref(false), err = ref('')
async function send() {
  busy.value = true; err.value = ''; done.value = false
  try { await useSubmit('messages', { ...f }); done.value = true; Object.assign(f, { name: '', contact: '', message: '' }) }
  catch (e: any) { err.value = e.message }
  busy.value = false
}
</script>
