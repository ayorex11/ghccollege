<template>
  <div>
    <PageHero title="News and achievements" intro="Announcements, events and stories from the school." />
    <section class="wrap section">
      <div class="mb-6 flex flex-col gap-3 sm:flex-row">
        <input v-model="q" class="input sm:max-w-xs" placeholder="Search news" aria-label="Search news" />
        <div class="flex flex-wrap gap-2">
          <button v-for="c in cats" :key="c" class="btn !py-1.5 !px-3" :class="cat === c ? 'bg-maroon text-white' : 'border border-line bg-white text-ink'" @click="cat = c">{{ c }}</button>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><PostCard v-for="p in shown" :key="p.slug" :p="p" /></div>
      <p v-if="!shown.length" class="mt-4">No articles match your search.</p>
    </section>
  </div>
</template>
<script setup lang="ts">
import { posts } from '~/data/site'
useSeo('News', 'News, announcements and achievements from Goldenheart College.')
const q = ref(''), cat = ref('All')
const cats = ['All', ...new Set(posts.map(p => p.category))]
const shown = computed(() => posts.filter(p => (cat.value === 'All' || p.category === cat.value) && (p.title + p.excerpt).toLowerCase().includes(q.value.toLowerCase())))
</script>
