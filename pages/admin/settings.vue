<template>
  <div class="max-w-2xl">
    <h1 class="text-3xl font-semibold">Site settings</h1>
    <p class="mt-1 text-sm">Changes appear on the website once the public pages are connected to the database.</p>
    <form class="card mt-6 space-y-4 p-5" @submit.prevent="save">
      <label v-for="f in fields" :key="f.key" class="block text-sm font-semibold">{{ f.label }}
        <div v-if="f.type === 'image'" class="mt-1 font-normal">
          <img v-if="form[f.key]" :src="form[f.key]" alt="" class="mb-2 h-32 rounded border border-line object-cover" />
          <input type="file" accept="image/*" class="text-sm" @change="pick($event, f.key)" />
          <button v-if="form[f.key]" type="button" class="ml-3 text-xs font-semibold text-error" @click="form[f.key] = ''">Remove photo</button>
          <span v-if="busyKey === f.key" class="ml-2 text-xs">Uploading…</span>
        </div>
        <input v-else v-model="form[f.key]" class="input mt-1 font-normal" />
        <span v-if="f.help" class="mt-1 block text-xs font-normal">{{ f.help }}</span>
      </label>
      <button class="btn-primary" :disabled="busy">Save settings</button>
      <p v-if="msg" class="text-sm font-semibold" :class="ok ? 'text-wa' : 'text-error'">{{ msg }}</p>
    </form>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const sb = useNuxtApp().$supabase
const fields: { key: string; label: string; help?: string; type?: string }[] = [
  { key: 'heroImage', label: 'Home page photo', type: 'image', help: 'The large photo beside the headline. A landscape photo of the campus works best.' },
  { key: 'aboutImage', label: 'About page photo', type: 'image', help: 'The photo beside “Our story”.' },
  { key: 'phone', label: 'Phone number', help: 'For example +234 903 135 4602' },
  { key: 'phone2', label: 'Second phone number', help: 'For example +234 705 893 8843' },
  { key: 'whatsapp', label: 'WhatsApp number (digits only)', help: 'For example 2349031354602' },
  { key: 'email', label: 'School email' },
  { key: 'address', label: 'Address' },
  { key: 'mapsLink', label: 'Google Maps link' },
  { key: 'instagram', label: 'Instagram link' },
  { key: 'youtube', label: 'YouTube link' },
  { key: 'facebook', label: 'Facebook link' },
  { key: 'broadcastLink', label: 'WhatsApp channel or group invite link' },
  { key: 'session', label: 'Current session', help: 'For example 2026/2027' },
  { key: 'visitingDays', label: 'Parents’ visiting days' },
  { key: 'heroTitle', label: 'Home page headline' },
]
const form = reactive<Record<string, string>>({})
const busyKey = ref('')
async function pick(e: Event, key: string) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  busyKey.value = key
  try { form[key] = await uploadImage('site', file) } catch (err: any) { alert(err.message) }
  busyKey.value = ''
}
const busy = ref(false), msg = ref(''), ok = ref(true)
onMounted(async () => {
  const { data } = await sb.from('site_settings').select('*')
  for (const r of data || []) form[r.key] = r.value
})
async function save() {
  busy.value = true; msg.value = ''
  const rows = fields.filter(f => form[f.key] !== undefined && (form[f.key] !== '' || f.type === 'image')).map(f => ({ key: f.key, value: form[f.key] }))
  const { error } = await sb.from('site_settings').upsert(rows)
  ok.value = !error; msg.value = error ? error.message : 'Settings saved.'
  busy.value = false
}
</script>
