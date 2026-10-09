<template>
  <NuxtLink :to="`/events/${e.slug}`" class="card card-hover flex items-center gap-4 p-4">
    <div class="w-14 shrink-0 rounded bg-maroon text-center text-white py-1.5">
      <p class="text-[11px] font-semibold">{{ d.toLocaleString('en-GB', { month: 'short' }) }}</p>
      <p class="font-serif text-2xl leading-none">{{ d.getDate() }}</p>
    </div>
    <div class="min-w-0">
      <p class="font-semibold text-ink">{{ e.title }}</p>
      <p class="text-sm">{{ e.time }}, {{ e.location }}</p>
    </div>
    <span class="chip ml-auto hidden sm:inline-block">{{ e.category }}</span>
  </NuxtLink>
</template>
<script setup lang="ts">
const props = defineProps<{ e: { slug: string; title: string; date: string; time: string; location: string; category: string } }>()
const d = new Date(props.e.date)
</script>
