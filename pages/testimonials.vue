<template>
  <div>
    <PageHero title="Parent voices" intro="What families say about Goldenheart College." />
    <section class="wrap section grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Quote v-for="(t, i) in testimonials" :key="i" :t="t" /></section>
  </div>
</template>
<script setup lang="ts">
const { data: testimonials } = await useTestimonials()
useSeo('Parent voices', 'What parents say about Goldenheart College, a Christian co-educational full boarding school in Abeokuta, Ogun State.')
</script>
