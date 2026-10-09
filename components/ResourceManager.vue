<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-3xl font-semibold">{{ res.label }}</h1>
      <div class="flex gap-2">
        <button v-if="res.csv" class="btn-outline !py-2" @click="exportCsv">Download CSV</button>
        <button v-if="res.canCreate !== false" class="btn-primary !py-2" @click="startNew">Add {{ res.singular }}</button>
      </div>
    </div>
    <p v-if="msg" class="mt-3 text-sm font-semibold" :class="ok ? 'text-wa' : 'text-error'">{{ msg }}</p>

    <!-- Edit form -->
    <form v-if="edit" class="card mt-6 space-y-4 p-5" @submit.prevent="save">
      <h2 class="text-xl font-semibold">{{ isNew ? `New ${res.singular}` : `Edit ${res.singular}` }}</h2>
      <div v-for="f in res.fields" :key="f.key" class="text-sm font-semibold">
        <label v-if="f.type !== 'bool'" :for="f.key">{{ f.label }}<span v-if="f.required" class="text-error"> *</span></label>
        <label v-else class="flex items-center gap-2"><input v-model="edit[f.key]" type="checkbox" class="h-4 w-4 accent-[#8B1A1A]" :disabled="f.readonly" /> {{ f.label }}</label>

        <textarea v-if="f.type === 'textarea'" :id="f.key" v-model="edit[f.key]" rows="6" class="input mt-1 font-normal" :disabled="f.readonly" :required="f.required" />
        <select v-else-if="f.type === 'select'" :id="f.key" v-model="edit[f.key]" class="input mt-1 font-normal" :required="f.required">
          <option value="" disabled>Choose…</option>
          <template v-if="f.from"><option v-for="o in lookups[f.key] || []" :key="o.value" :value="o.value">{{ o.label }}</option></template>
          <template v-else><option v-for="o in f.options" :key="o" :value="o">{{ o }}</option></template>
        </select>
        <div v-else-if="f.type === 'image'" class="mt-1 font-normal">
          <img v-if="edit[f.key]" :src="edit[f.key]" alt="" class="mb-2 h-32 rounded border border-line object-cover" />
          <input :id="f.key" type="file" accept="image/*" class="text-sm" @change="upload($event, f.key)" />
          <span v-if="uploading === f.key" class="ml-2 text-xs">Uploading…</span>
        </div>
        <input v-else-if="f.type !== 'bool'" :id="f.key" v-model="edit[f.key]" :type="f.type === 'number' ? 'number' : f.type" class="input mt-1 font-normal" :disabled="f.readonly" :required="f.required" />
        <p v-if="f.help" class="mt-1 text-xs font-normal">{{ f.help }}</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-primary" :disabled="busy">Save</button>
        <button type="button" class="btn-outline" @click="edit = null">Cancel</button>
      </div>
    </form>

    <!-- List -->
    <div class="card mt-6 overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-line bg-maroon-soft text-ink">
          <tr><th v-for="c in res.columns" :key="c" class="px-4 py-3 font-semibold">{{ label(c) }}</th><th class="px-4 py-3" /></tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.id" class="border-b border-line last:border-0">
            <td v-for="c in res.columns" :key="c" class="max-w-[16rem] truncate px-4 py-3">{{ show(r[c]) }}</td>
            <td class="whitespace-nowrap px-4 py-3 text-right">
              <button class="mr-3 font-semibold text-maroon" @click="startEdit(r)">{{ res.canCreate === false ? 'Open' : 'Edit' }}</button>
              <button class="font-semibold text-error" @click="remove(r)">Delete</button>
            </td>
          </tr>
          <tr v-if="!rows.length && !loading"><td :colspan="res.columns.length + 1" class="px-4 py-8 text-center">Nothing here yet.</td></tr>
          <tr v-if="loading"><td :colspan="res.columns.length + 1" class="px-4 py-8 text-center">Loading…</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '~/data/adminResources'
const props = defineProps<{ res: Resource }>()
const sb = useNuxtApp().$supabase

const rows = ref<any[]>([]), loading = ref(true), edit = ref<any>(null), isNew = ref(false)
const busy = ref(false), msg = ref(''), ok = ref(true), uploading = ref('')
const lookups = reactive<Record<string, { value: string; label: string }[]>>({})

const label = (k: string) => k.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase())
const show = (v: any) => (v === true ? 'Yes' : v === false ? 'No' : v == null ? '' : /^\d{4}-\d\d-\d\dT/.test(String(v)) ? new Date(v).toLocaleDateString('en-GB') : String(v))
const flash = (text: string, good = true) => { msg.value = text; ok.value = good }

async function load() {
  loading.value = true
  const { data, error } = await sb.from(props.res.table).select('*').order(props.res.order.col, { ascending: props.res.order.asc })
  if (error) flash(error.message, false)
  rows.value = data || []
  loading.value = false
}
onMounted(async () => {
  for (const f of props.res.fields.filter(f => f.from)) {
    const { data } = await sb.from(f.from!.table).select(`${f.from!.value}, ${f.from!.label}`)
    lookups[f.key] = (data || []).map((d: any) => ({ value: d[f.from!.value], label: d[f.from!.label] }))
  }
  load()
})

function blank() {
  const o: any = {}
  for (const f of props.res.fields) o[f.key] = f.type === 'bool' ? false : ''
  return o
}
function startNew() { edit.value = blank(); isNew.value = true; msg.value = '' }
function startEdit(r: any) {
  edit.value = { ...blank(), ...Object.fromEntries(props.res.fields.map(f => [f.key, r[f.key] ?? (f.type === 'bool' ? false : '')])), id: r.id }
  isNew.value = false; msg.value = ''
  nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function save() {
  busy.value = true
  const row: any = {}
  for (const f of props.res.fields) {
    if (f.readonly) continue
    let v = edit.value[f.key]
    if (f.slugFrom && !v) v = slugify(edit.value[f.slugFrom] || '')
    if (v === '' && f.type !== 'text' && f.type !== 'textarea') v = null
    if (f.type === 'number' && v !== null) v = Number(v)
    row[f.key] = v
  }
  if (props.res.table === 'posts' && row.published) row.published_at = new Date().toISOString()
  const q = isNew.value ? sb.from(props.res.table).insert(row) : sb.from(props.res.table).update(row).eq('id', edit.value.id)
  const { error } = await q
  busy.value = false
  if (error) return flash(error.code === '23505' ? 'That web address name is already used. Change it and save again.' : error.message, false)
  flash('Saved.'); edit.value = null; load()
}
async function remove(r: any) {
  if (!confirm('Delete this permanently?')) return
  const { error } = await sb.from(props.res.table).delete().eq('id', r.id)
  if (error) flash(error.message, false); else { flash('Deleted.'); load() }
}
async function upload(e: Event, key: string) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = key
  const path = `${props.res.table}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const { error } = await sb.storage.from('images').upload(path, file)
  uploading.value = ''
  if (error) return flash(error.message, false)
  edit.value[key] = sb.storage.from('images').getPublicUrl(path).data.publicUrl
}
function exportCsv() {
  const cols = props.res.columns
  const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [cols.join(','), ...rows.value.map(r => cols.map(c => esc(r[c])).join(','))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = `${props.res.slug}.csv`; a.click()
}
</script>
