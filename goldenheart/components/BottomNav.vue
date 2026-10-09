<template>
  <nav class="lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-white pb-[env(safe-area-inset-bottom)]" aria-label="Quick">
    <NuxtLink v-for="n in tabs" :key="n.to" :to="n.to" class="flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold text-ink-body" active-class="!text-maroon">
      <Icon :name="n.icon" /> {{ n.label }}
    </NuxtLink>
  </nav>
</template>
<script setup lang="ts">
import { nav } from '~/data/site'
const keep = ['/', '/academics', '/school-life', '/events', '/contact']
const tabs = nav.filter(n => keep.includes(n.to))
</script>
