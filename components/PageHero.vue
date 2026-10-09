<template>
  <section class="bg-maroon text-white">
    <div class="wrap py-10 md:py-16">
      <p class="font-serif tracking-[0.08em] text-gold-light text-sm">★ {{ settings.motto }} ★</p>
      <h1 class="mt-3 !text-white h-display">{{ title }}</h1>
      <p v-if="intro" class="mt-4 max-w-2xl text-white/85 text-[17px] leading-[26px]">{{ intro }}</p>
      <div class="mt-5"><slot /></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { settings } from '~/data/site'
defineProps<{ title: string; intro?: string }>()
</script>
