<template>
  <div class="max-w-2xl">
    <h1 class="text-3xl font-semibold">Upload photos</h1>
    <p class="mt-1 text-sm">Choose an album, then select as many photos as you like. They are shrunk automatically so the site stays fast on phones.</p>
    <p v-if="!albums.length && loaded" class="card mt-6 p-4 text-sm">You need an album first. <NuxtLink to="/admin/albums" class="font-semibold text-maroon">Create one under Photo albums</NuxtLink>.</p>
    <div v-else class="card mt-6 space-y-4 p-5">
      <label class="block text-sm font-semibold">Album
        <select v-model="albumId" class="input mt-1 font-normal"><option value="" disabled>Choose an album…</option><option v-for="a in albums" :key="a.id" :value="a.id">{{ a.title }}</option></select>
      </label>
      <label class="block text-sm font-semibold">Photos
        <input type="file" accept="image/*" multiple class="mt-1 block text-sm font-normal" @change="files = Array.from(($event.target as HTMLInputElement).files || [])" />
      </label>
      <p v-if="files.length" class="text-sm">{{ files.length }} photo{{ files.length > 1 ? 's' : '' }} selected.</p>
      <button class="btn-primary" :disabled="!albumId || !files.length || busy" @click="start">{{ busy ? `Uploading ${done} of ${files.length}…` : 'Upload photos' }}</button>
      <div v-if="busy" class="h-2 overflow-hidden rounded bg-line"><div class="h-full bg-maroon transition-all" :style="{ width: (done / files.length) * 100 + '%' }" /></div>
      <p v-if="msg" class="text-sm font-semibold" :class="failed ? 'text-error' : 'text-wa'">{{ msg }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const sb = useNuxtApp().$supabase
const albums = ref<any[]>([]), loaded = ref(false), albumId = ref(''), files = ref<File[]>([])
const busy = ref(false), done = ref(0), msg = ref(''), failed = ref(false)
onMounted(async () => { const { data } = await sb.from('albums').select('id,title').order('sort'); albums.value = data || []; loaded.value = true })
async function start() {
  busy.value = true; done.value = 0; msg.value = ''; failed.value = false
  const queue = [...files.value]; let bad = 0
  const worker = async () => {
    for (let f = queue.shift(); f; f = queue.shift()) {
      try {
        const url = await uploadImage('photos', f)
        const { error } = await sb.from('photos').insert({ album_id: albumId.value, url, caption: '' })
        if (error) throw error
      } catch { bad++ }
      done.value++
    }
  }
  await Promise.all([worker(), worker(), worker()])
  busy.value = false; failed.value = bad > 0
  msg.value = bad ? `${files.value.length - bad} uploaded, ${bad} failed. Try the failed ones again.` : `All ${files.value.length} photos uploaded.`
  files.value = []
}
</script>
