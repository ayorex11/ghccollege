<template>
  <div v-for="f in fields" :key="f.key" class="text-sm font-semibold">
    <label>{{ f.label }}
      <textarea v-if="f.type === 'textarea'" v-model="item[f.key]" rows="5" class="input mt-1 font-normal" />
      <textarea v-else-if="f.type === 'lines'" :value="(item[f.key] || []).join('\n')" rows="8" class="input mt-1 font-normal" @input="item[f.key] = ($event.target as HTMLTextAreaElement).value.split('\n')" />
      <select v-else-if="f.type === 'select'" v-model="item[f.key]" class="input mt-1 font-normal">
        <option v-for="o in f.options" :key="typeof o === 'string' ? o : o.value" :value="typeof o === 'string' ? o : o.value">{{ typeof o === 'string' ? o : o.label }}</option>
      </select>
      <input v-else-if="f.type === 'text'" v-model="item[f.key]" class="input mt-1 font-normal" />
    </label>
    <div v-if="f.type === 'image'" class="mt-1 font-normal">
      <img v-if="item[f.key]" :src="item[f.key]" alt="" class="mb-2 h-28 rounded border border-line object-cover" />
      <input type="file" accept="image/*" class="text-sm" @change="pick($event, f.key)" />
      <button v-if="item[f.key]" type="button" class="ml-3 text-xs font-semibold text-error" @click="item[f.key] = ''">Remove photo</button>
      <span v-if="busy === f.key" class="ml-2 text-xs">Uploading…</span>
    </div>
    <p v-if="f.help" class="mt-1 text-xs font-normal">{{ f.help }}</p>
  </div>
</template>
<script setup lang="ts">
import type { BField } from '~/data/adminBlocks'
const props = defineProps<{ fields: BField[]; item: any; folder: string }>()
const busy = ref('')
async function pick(e: Event, key: string) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  busy.value = key
  try { props.item[key] = await uploadImage(props.folder, file) } catch (err: any) { alert(err.message) }
  busy.value = ''
}
</script>
