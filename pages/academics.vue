<template>
  <div>
    <PageHero title="Academics" intro="A Nigerian and British blend curriculum, of international standard, preparing students for WAEC and NECO." />

    <section class="wrap section grid gap-4 md:grid-cols-2">
      <div v-for="l in levels" :key="l.key" class="card p-6">
        <span class="chip">{{ l.ages }}</span>
        <h2 class="mt-3 text-2xl font-semibold">{{ l.name }}</h2>
        <p class="mt-2">{{ l.text }}</p>
        <p class="mt-3 text-sm"><span class="font-semibold text-ink">Examinations:</span> {{ l.exam }}</p>
      </div>
    </section>

    <section v-if="subjects.jss.length || subjects.sss.length" class="wrap section">
      <SectionTitle title="Subjects offered" />
      <div class="flex gap-2 mb-4">
        <button v-for="l in levels" :key="l.key" class="btn !py-2" :class="tab === l.key ? 'bg-maroon text-white' : 'border border-line bg-white text-ink'" @click="tab = l.key">{{ l.key.toUpperCase() }}</button>
      </div>
      <ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in subjects[tab as 'jss' | 'sss']" :key="s" class="card px-4 py-3 text-ink font-medium">{{ s }}</li>
      </ul>
    </section>

    <section class="wrap section">
      <SectionTitle :title="`Academic calendar ${settings.session}`" sub="Term dates are sample dates until the school confirms them." />
      <div class="space-y-3">
        <div v-for="t in termDates" :key="t.term" class="card p-5">
          <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 class="font-serif text-xl font-semibold text-ink">{{ t.term }}</h3>
            <p class="text-sm font-semibold text-maroon">{{ fmt(t.start) }} to {{ fmt(t.end) }}</p>
          </div>
          <p class="mt-2 text-sm">{{ t.note }}</p>
        </div>
      </div>
    </section>

    <section class="wrap section">
      <NuxtLink to="/results" class="card card-hover mb-6 block p-5"><p class="font-serif text-xl font-semibold text-maroon">See our WAEC results</p><p class="mt-1 text-sm">Grades by year and subject, 2024 to 2026.</p></NuxtLink>
      <div class="rounded-card bg-maroon p-8 text-center text-white">
        <h2 class="!text-white text-3xl font-semibold">Questions about the curriculum?</h2>
        <p class="mt-2 text-white/85">Speak to the school directly.</p>
        <a :href="wa('Hello, I would like to ask about the curriculum at Goldenheart College.')" target="_blank" rel="noopener" class="btn-wa mt-4"><Icon name="chat" /> Chat on WhatsApp</a>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { settings, levels, wa } from '~/data/site'
const { subjects } = await useBlockContent()
const { data: termDates } = await useTerms()
useSeo('Academics', 'Subjects, curriculum and the academic calendar at Goldenheart College. WAEC and NECO preparation.')
const tab = ref('jss')
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>
