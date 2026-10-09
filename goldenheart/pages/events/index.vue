<template>
  <div>
    <PageHero title="Events" intro="Upcoming dates for students and parents." />
    <section class="wrap section">
      <div v-for="(group, month) in byMonth" :key="month" class="mb-8">
        <h2 class="mb-3 text-2xl font-semibold">{{ month }}</h2>
        <div class="grid gap-3 md:grid-cols-2"><EventRow v-for="e in group" :key="e.slug" :e="e" /></div>
      </div>
      <p v-if="!events.length">No events yet. Check back soon.</p>
    </section>
  </div>
</template>
<script setup lang="ts">
import { events } from '~/data/site'
useSeo('Events', 'Upcoming events and term dates at Goldenheart College.')
const byMonth = computed(() => {
  const out: Record<string, typeof events> = {}
  for (const e of [...events].sort((a, b) => a.date.localeCompare(b.date))) {
    const k = new Date(e.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    ;(out[k] ||= []).push(e)
  }
  return out
})
</script>
