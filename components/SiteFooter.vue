<template>
  <footer class="bg-ink text-white/80 mt-8">
    <div class="wrap grid gap-8 py-10 md:grid-cols-3">
      <div>
        <div class="flex items-center gap-3"><img src="/logo.jpg" alt="" class="h-12 w-12 rounded bg-white p-0.5 object-contain" /><p class="font-serif text-xl text-white">Goldenheart College</p></div>
        <p class="mt-3 font-serif italic text-gold-light">{{ settings.motto }}</p>
        <p class="mt-3 text-sm">Co-educational full boarding school for ages 10 to 16. A Christian faith-based school, open to families of all faiths.</p>
      </div>
      <div>
        <p class="font-semibold text-white">Quick links</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="n in nav" :key="n.to"><NuxtLink :to="n.to" class="hover:text-white">{{ n.label }}</NuxtLink></li>
          <li><NuxtLink to="/policies" class="hover:text-white">Policies and safeguarding</NuxtLink></li>
          <li><NuxtLink to="/testimonials" class="hover:text-white">Parent voices</NuxtLink></li>
        </ul>
      </div>
      <div class="text-sm space-y-2">
        <p class="font-semibold text-white">Contact</p>
        <p>{{ settings.addressLines.join(' ') }}</p>
        <p v-for="ph in [settings.phone, settings.phone2].filter(Boolean)" :key="ph"><a :href="`tel:${ph.replace(/\s/g,'')}`" class="hover:text-white">{{ ph }}</a></p>
        <p><a :href="`mailto:${settings.email}`" class="hover:text-white break-all">{{ settings.email }}</a></p>
        <p class="pt-2 flex gap-4">
          <a :href="settings.social.youtube" target="_blank" rel="noopener" class="hover:text-white">YouTube</a>
          <a :href="settings.social.instagram" target="_blank" rel="noopener" class="hover:text-white">Instagram</a>
          <a v-if="settings.social.facebook" :href="settings.social.facebook" target="_blank" rel="noopener" class="hover:text-white">Facebook</a>
        </p>
      </div>
    </div>
    <p class="border-t border-white/10 py-4 text-center text-xs">© {{ new Date().getFullYear() }} Goldenheart College. All rights reserved.</p>
  </footer>
</template>
<script setup lang="ts">
import { nav, settings } from '~/data/site'
</script>
