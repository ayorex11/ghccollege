<template>
  <div class="max-w-3xl">
    <h1 class="text-3xl font-semibold">{{ b.label }}</h1>
    <p v-if="b.hint" class="mt-1 text-sm">{{ b.hint }}</p>
    <p v-if="!loaded" class="mt-6 text-sm">Loading…</p>
    <form v-else class="mt-6 space-y-5" @submit.prevent="save">
      <p v-if="fromDefaults" class="card border-gold/60 bg-maroon-soft p-3 text-sm">This is the sample text currently on the website. Edit it and save to replace it.</p>

      <div v-if="b.kind === 'object'" class="card space-y-4 p-5"><FieldInputs :fields="b.fields" :item="data" :folder="b.key" /></div>

      <template v-else>
        <div v-for="(item, i) in data" :key="i" class="card space-y-4 p-5">
          <div class="flex items-center justify-between">
            <p class="font-serif text-lg font-semibold text-ink">{{ b.itemName }} {{ i + 1 }}</p>
            <div class="flex gap-3 text-sm font-semibold">
              <button type="button" class="text-maroon disabled:opacity-30" :disabled="i === 0" @click="move(i, -1)">Up</button>
              <button type="button" class="text-maroon disabled:opacity-30" :disabled="i === data.length - 1" @click="move(i, 1)">Down</button>
              <button type="button" class="text-error" @click="data.splice(i, 1)">Remove</button>
            </div>
          </div>
          <FieldInputs :fields="b.fields" :item="item" :folder="b.key" />
        </div>
        <button type="button" class="btn-outline" @click="data.push({})">Add {{ b.itemName }}</button>
      </template>

      <div class="sticky bottom-0 -mx-1 flex items-center gap-3 bg-ivory/95 px-1 py-3">
        <button class="btn-primary" :disabled="busy">Save</button>
        <p v-if="msg" class="text-sm font-semibold" :class="ok ? 'text-wa' : 'text-error'">{{ msg }}</p>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import type { Block } from '~/data/adminBlocks'
const props = defineProps<{ b: Block }>()
const sb = useNuxtApp().$supabase
const data = ref<any>(null), loaded = ref(false), fromDefaults = ref(false), busy = ref(false), msg = ref(''), ok = ref(true)
onMounted(async () => {
  const { data: row } = await sb.from('content_blocks').select('body').eq('key', props.b.key).maybeSingle()
  fromDefaults.value = !row
  data.value = JSON.parse(JSON.stringify(row?.body ?? props.b.defaults))
  loaded.value = true
})
function move(i: number, d: number) { const a = data.value; [a[i], a[i + d]] = [a[i + d], a[i]] }
function clean(item: any) {
  const out: any = { ...item }
  for (const f of props.b.fields) if (f.type === 'lines') out[f.key] = (out[f.key] || []).map((l: string) => l.trim()).filter(Boolean)
  return out
}
async function save() {
  busy.value = true; msg.value = ''
  const body = props.b.kind === 'object' ? clean(data.value) : data.value.map(clean)
  const { error } = await sb.from('content_blocks').upsert({ key: props.b.key, title: props.b.label, body })
  busy.value = false; ok.value = !error
  msg.value = error ? error.message : 'Saved. The website now shows this.'
  if (!error) fromDefaults.value = false
}
</script>
