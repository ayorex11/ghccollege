<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1"><slot /></main>
    <SiteFooter />
    <BottomNav />
    <a :href="wa('Hello Goldenheart College, I would like to make an enquiry.')" target="_blank" rel="noopener"
       class="btn-wa fixed right-4 bottom-20 lg:bottom-6 z-40 rounded-full shadow-lift" aria-label="Chat on WhatsApp">
      <Icon name="chat" /><span class="hidden sm:inline">Chat with us</span>
    </a>
  </div>
</template>
<script setup lang="ts">
import { wa } from '~/data/site'
</script>
