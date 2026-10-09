<template>
  <div v-if="e">
    <PageHero :title="e.title" :intro="`${fmt(e.date)}, ${e.time}`" />
    <section class="wrap section max-w-3xl">
      <p><span class="font-semibold text-ink">Where:</span> {{ e.location }}</p>
      <p class="mt-4 text-[17px] leading-[26px]">{{ e.text }}</p>
      <NuxtLink to="/events" class="btn-outline mt-6">Back to events</NuxtLink>
    </section>
  </div>
</template>
<script setup lang="ts">
import { events } from '~/data/site'
const e = events.find(x => x.slug === useRoute().params.slug)
if (!e) throw createError({ statusCode: 404, statusMessage: 'Event not found' })
useSeo(e.title, e.text)
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
</script>
