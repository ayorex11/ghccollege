<template>
  <div>
    <PageHero title="Parent voices" intro="What families say about Goldenheart College." />
    <section class="wrap section grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Quote v-for="(t, i) in testimonials" :key="i" :t="t" /></section>
  </div>
</template>
<script setup lang="ts">
import { testimonials } from '~/data/site'
useSeo('Parent voices', 'Testimonials from parents of Goldenheart College students.')
</script>
