<template>
  <div>
    <PageHero title="School life" intro="A full boarding community on 35 acres, where students learn, play and grow together." />

    <section class="wrap section">
      <SectionTitle title="Facilities" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="f in facilities" :key="f.title" class="card overflow-hidden">
          <img v-if="f.photo" :src="f.photo" :alt="f.title" class="aspect-[16/10] w-full object-cover" loading="lazy" />
          <div class="p-5">
            <Icon v-if="!f.photo" :name="f.icon || 'home'" class="text-3xl text-maroon" />
            <h3 class="mt-3 text-xl font-semibold">{{ f.title }}</h3><p class="mt-1 text-sm">{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="routine.length" class="wrap section">
      <SectionTitle title="A day in boarding" />
      <ol class="space-y-3">
        <li v-for="r in routine" :key="r.time" class="card flex gap-4 p-4">
          <p class="w-20 shrink-0 font-serif font-semibold text-maroon">{{ r.time }}</p>
          <div><p class="font-semibold text-ink">{{ r.title }}</p><p class="text-sm">{{ r.text }}</p></div>
        </li>
      </ol>
    </section>

    <section v-if="clubs.length" class="wrap section">
      <SectionTitle title="Clubs and societies" />
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
import { settings, wa } from '~/data/site'
const { facilities, routine, clubs } = await useBlockContent()
useSeo('School life', 'Boarding life, facilities, clubs and daily routine at Goldenheart College.')
const cats = ['All', ...new Set(clubs.map((c: any) => c.category).filter(Boolean))]
const cat = ref('All')
const shown = computed(() => clubs.filter((c: any) => cat.value === 'All' || c.category === cat.value))
</script>
