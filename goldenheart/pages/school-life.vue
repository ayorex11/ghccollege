<template>
  <div>
    <PageHero title="School life" intro="A full boarding community on 35 acres, where students learn, play and grow together." />

    <section class="wrap section">
      <SectionTitle title="Facilities" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="f in facilities" :key="f.title" class="card p-5">
          <Icon :name="f.icon" class="text-maroon" size="2em" />
          <h3 class="mt-3 text-xl font-semibold">{{ f.title }}</h3><p class="mt-1 text-sm">{{ f.text }}</p>
        </div>
      </div>
    </section>

    <section class="wrap section">
      <SectionTitle title="A day in boarding" sub="A sample routine. The school will confirm the real timetable." />
      <ol class="space-y-3">
        <li v-for="r in routine" :key="r.time" class="card flex gap-4 p-4">
          <p class="w-20 shrink-0 font-serif font-semibold text-maroon">{{ r.time }}</p>
          <div><p class="font-semibold text-ink">{{ r.title }}</p><p class="text-sm">{{ r.text }}</p></div>
        </li>
      </ol>
    </section>

    <section class="wrap section">
      <SectionTitle title="Clubs and societies" sub="Sample list. The school will confirm the clubs that run." />
      <div class="flex flex-wrap gap-2 mb-4">
        <button v-for="c in cats" :key="c" class="btn !py-1.5 !px-3" :class="cat === c ? 'bg-maroon text-white' : 'border border-line bg-white text-ink'" @click="cat = c">{{ c }}</button>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="c in shown" :key="c.name" class="card p-5">
          <span class="chip">{{ c.category }}</span>
          <h3 class="mt-2 text-xl font-semibold">{{ c.name }}</h3><p class="mt-1 text-sm">{{ c.text }}</p>
          <p class="mt-2 text-xs font-semibold">{{ c.day }}</p>
        </div>
      </div>
    </section>

    <section class="wrap section">
      <div class="card p-6 md:p-8">
        <h2 class="text-2xl font-semibold">Visiting your child</h2>
        <p class="mt-2">Visiting days: {{ settings.visitingDays }}. Please message the school before you travel.</p>
        <a :href="wa('Hello, I would like to ask about visiting days at Goldenheart College.')" target="_blank" rel="noopener" class="btn-wa mt-4"><Icon name="chat" /> Ask on WhatsApp</a>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { settings, facilities, routine, clubs, wa } from '~/data/site'
useSeo('School life', 'Boarding life, facilities, clubs and daily routine at Goldenheart College.')
const cats = ['All', ...new Set(clubs.map(c => c.category))]
const cat = ref('All')
const shown = computed(() => clubs.filter(c => cat.value === 'All' || c.category === cat.value))
</script>
