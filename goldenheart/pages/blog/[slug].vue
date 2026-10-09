<template>
  <article v-if="p">
    <PageHero :title="p.title" :intro="`${fmt(p.date)}, ${p.category}`" />
    <div class="wrap section max-w-3xl">
      <div class="prose-gh text-[17px] leading-[28px]"><p v-for="(para, i) in p.body" :key="i">{{ para }}</p></div>
      <div class="mt-8 flex flex-wrap gap-3">
        <a :href="`https://wa.me/?text=${encodeURIComponent(p.title + ' ' + url)}`" target="_blank" rel="noopener" class="btn-wa"><Icon name="share" /> Share on WhatsApp</a>
        <NuxtLink to="/blog" class="btn-outline">Back to news</NuxtLink>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { posts } from '~/data/site'
const p = posts.find(x => x.slug === useRoute().params.slug)
if (!p) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
useSeo(p.title, p.excerpt)
const url = useRequestURL().href
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>
