<template>
  <div class="min-h-screen bg-ivory lg:flex">
    <aside class="bg-ink text-white/80 lg:w-60 lg:min-h-screen lg:shrink-0">
      <div class="flex items-center justify-between p-4 lg:block">
        <NuxtLink to="/admin" class="flex items-center gap-3"><img src="/logo.jpg" alt="" class="h-9 w-9 rounded bg-white p-0.5 object-contain" /><span class="font-serif text-lg text-white">GHC Admin</span></NuxtLink>
        <button class="lg:hidden p-2" aria-label="Menu" @click="open = !open"><Icon :name="open ? 'close' : 'menu'" /></button>
      </div>
      <nav :class="open ? 'block' : 'hidden'" class="pb-4 lg:block" aria-label="Admin">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="block px-5 py-2.5 text-sm hover:bg-white/10" active-class="!bg-maroon !text-white" exact-active-class="!bg-maroon !text-white" @click="open = false">{{ l.label }}</NuxtLink>
        <NuxtLink to="/" target="_blank" class="mt-3 block px-5 py-2.5 text-sm text-gold-light">View website</NuxtLink>
        <button class="block w-full px-5 py-2.5 text-left text-sm hover:bg-white/10" @click="signOut">Sign out</button>
      </nav>
    </aside>
    <main class="flex-1 p-4 md:p-8"><slot /></main>
  </div>
</template>
<script setup lang="ts">
import { resources } from '~/data/adminResources'
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
const open = ref(false)
const links = [{ label: 'Dashboard', to: '/admin' }, { label: 'Site settings', to: '/admin/settings' }, ...resources.map(r => ({ label: r.label, to: `/admin/${r.slug}` }))]
async function signOut() { await useNuxtApp().$supabase.auth.signOut(); navigateTo('/admin/login') }
</script>
