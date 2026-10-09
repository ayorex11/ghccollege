<template>
  <NuxtLink :to="`/blog/${p.slug}`" class="card card-hover overflow-hidden block">
    <img v-if="p.cover" :src="p.cover" :alt="p.title" class="aspect-[16/9] w-full object-cover" loading="lazy" />
    <ImagePlaceholder v-else ratio="aspect-[16/9]" :label="p.category" class="!rounded-none" />
    <div class="p-4">
      <p class="text-sm">{{ fmt(p.date) }}</p>
      <h3 class="mt-1 text-xl font-semibold">{{ p.title }}</h3>
      <p class="mt-2 text-sm">{{ p.excerpt }}</p>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{ p: { slug: string; title: string; date: string; category: string; excerpt: string; cover?: string } }>()
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>
