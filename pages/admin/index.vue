<template>
  <div>
    <h1 class="text-3xl font-semibold">Dashboard</h1>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink v-for="c in cards" :key="c.label" :to="c.to" class="card card-hover p-5 block">
        <p class="font-serif text-4xl font-bold text-maroon">{{ c.value ?? '–' }}</p>
        <p class="mt-1 text-sm font-semibold text-ink">{{ c.label }}</p>
      </NuxtLink>
    </div>
    <p v-if="err" class="mt-4 text-sm text-error">{{ err }}</p>
    <div class="card mt-8 p-5 text-sm">
      <p class="font-semibold text-ink">Getting started</p>
      <p class="mt-1">Start with Site settings, then add the term dates under Academic calendar. Add news and events as they happen.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const sb = useNuxtApp().$supabase
const cards = ref<{ label: string; to: string; value: number | null }[]>([
  { label: 'Unread messages', to: '/admin/messages', value: null },
  { label: 'WhatsApp signups', to: '/admin/signups', value: null },
  { label: 'Testimonials awaiting approval', to: '/admin/testimonials', value: null },
  { label: 'Draft posts', to: '/admin/posts', value: null },
])
const err = ref('')
onMounted(async () => {
  const q = [
    sb.from('messages').select('*', { count: 'exact', head: true }).eq('read', false),
    sb.from('whatsapp_signups').select('*', { count: 'exact', head: true }),
    sb.from('testimonials').select('*', { count: 'exact', head: true }).eq('approved', false),
    sb.from('posts').select('*', { count: 'exact', head: true }).eq('published', false),
  ]
  const res = await Promise.all(q)
  res.forEach((r, i) => { if (r.error) err.value = r.error.message; cards.value[i].value = r.count })
})
</script>
