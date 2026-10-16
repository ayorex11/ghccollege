<template>
  <header class="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur">
    <div class="wrap flex items-center gap-3 py-2.5">
      <NuxtLink to="/" class="flex items-center gap-3 mr-auto" @click="open = false">
        <img src="/logo.jpg" alt="Goldenheart College crest" class="h-11 w-11 object-contain" />
        <span class="leading-tight">
          <span class="block font-serif text-lg font-bold text-maroon">Goldenheart College</span>
          <span class="block font-serif text-[11px] italic text-ink-body">{{ settings.motto }}</span>
        </span>
      </NuxtLink>
      <nav class="hidden lg:flex items-center gap-1" aria-label="Main">
        <NuxtLink v-for="n in nav.filter(i => i.to !== '/')" :key="n.to" :to="n.to"
          class="rounded px-3 py-2 text-sm font-semibold text-ink-body hover:text-maroon" :class="n.to === '/results' ? 'hidden xl:block' : ''"
          active-class="!text-maroon underline decoration-gold decoration-2 underline-offset-8">{{ n.label }}</NuxtLink>
      </nav>
      <a :href="wa()" target="_blank" rel="noopener" class="btn-wa !py-2 hidden sm:inline-flex">
        <Icon name="chat" /> WhatsApp
      </a>
      <button class="lg:hidden p-2 text-maroon" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <Icon :name="open ? 'close' : 'menu'" />
      </button>
    </div>
    <nav v-if="open" class="lg:hidden border-t border-line bg-white" aria-label="Mobile">
      <NuxtLink v-for="n in nav" :key="n.to" :to="n.to" class="flex items-center gap-3 px-5 py-3 border-b border-line text-ink font-semibold" @click="open = false">
        <Icon :name="n.icon" class="text-maroon" /> {{ n.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { nav, settings, wa } from '~/data/site'
const open = ref(false)
const route = useRoute()
watch(() => route.path, () => (open.value = false))
</script>
