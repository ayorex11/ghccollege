<template>
  <figure class="card p-5">
    <p class="text-gold text-lg">★★★★★</p>
    <blockquote class="mt-2 font-serif italic text-ink leading-7">“{{ t.quote }}”</blockquote>
    <figcaption class="mt-3 text-sm font-semibold">{{ t.name }}<span class="font-normal">, {{ t.relation }}</span></figcaption>
  </figure>
</template>
<script setup lang="ts">defineProps<{ t: { name: string; relation: string; quote: string } }>()</script>
