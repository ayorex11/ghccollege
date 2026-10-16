<template>
  <div>
    <PageHero title="WAEC results" intro="Examination results of our WASSCE candidates, shown without names or exam numbers to protect each student's privacy." />

    <section class="wrap section">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="s in summary" :key="s.label" class="card p-5 text-center">
          <p class="font-serif text-4xl font-bold text-maroon">{{ s.value }}</p><p class="mt-1 text-sm">{{ s.label }}</p>
        </div>
      </div>
      <p class="mt-4 text-sm">Credit means grade C6 or better. Figures are counted from candidates' WAEC online results. The number of candidates each year is small, so we show counts rather than percentages.</p>
    </section>

    <section v-for="y in stats.years" :key="y.year" class="wrap section">
      <div class="card p-5 md:p-8">
        <div class="flex flex-wrap items-end justify-between gap-2">
          <h2 class="h-section">WASSCE {{ y.year }}</h2>
          <p class="text-sm font-semibold text-maroon">{{ y.candidates }} candidate{{ y.candidates === 1 ? '' : 's' }}</p>
        </div>
        <p class="mt-2">{{ y.enMath }} of {{ y.candidates }} earned a credit in both English Language and General Mathematics. {{ y.credits }} of {{ y.entries }} subject entries were credit or better.</p>

        <h3 class="mt-6 text-lg font-semibold">Grades awarded</h3>
        <div class="mt-3 space-y-2">
          <div v-for="g in GRADES" :key="g" class="flex items-center gap-3 text-sm">
            <span class="w-8 font-semibold text-ink">{{ g }}</span>
            <div class="h-4 flex-1 overflow-hidden rounded bg-line"><div class="h-full rounded" :class="g[0] === 'A' ? 'bg-maroon' : g[0] === 'B' ? 'bg-ember' : 'bg-gold'" :style="{ width: (y.dist[g] / Math.max(1, y.entries)) * 100 + '%' }" /></div>
            <span class="w-6 text-right">{{ y.dist[g] }}</span>
          </div>
        </div>

        <h3 class="mt-6 text-lg font-semibold">By subject</h3>
        <div class="mt-3 overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead><tr class="border-b border-line text-ink"><th class="py-2 pr-4 font-semibold">Subject</th><th class="py-2 pr-4 font-semibold">Candidates</th><th class="py-2 font-semibold">Credit or better</th></tr></thead>
            <tbody><tr v-for="s in y.subjects" :key="s.subject" class="border-b border-line last:border-0"><td class="py-2 pr-4">{{ s.subject }}</td><td class="py-2 pr-4">{{ s.n }}</td><td class="py-2">{{ s.credit }} of {{ s.n }}</td></tr></tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="wrap pb-10"><div class="rounded-card bg-maroon p-8 text-center text-white">
      <h2 class="!text-white text-3xl font-semibold">Thinking of joining us?</h2>
      <p class="mt-2 text-white/85">Ask the school about admission and boarding.</p>
      <a :href="wa('Hello, I would like to ask about admission at Goldenheart College.')" target="_blank" rel="noopener" class="btn-wa mt-4"><Icon name="chat" /> Chat on WhatsApp</a>
    </div></section>
  </div>
</template>
<script setup lang="ts">
import { wa } from '~/data/site'
useSeo('WAEC results', 'WASSCE results of Goldenheart College candidates, with grade counts by year and subject. No names or exam numbers are shown.')
const { data: rows } = await useWaec()
const stats = computed(() => waecStats(rows.value))
const summary = computed(() => {
  const a = stats.value.all, yrs = stats.value.years.map(y => y.year)
  return [
    { value: String(a.candidates), label: `candidates, ${Math.min(...yrs)} to ${Math.max(...yrs)}` },
    { value: `${a.enMath} of ${a.candidates}`, label: 'with credits in English and Mathematics' },
    { value: String(a.entries), label: 'subject entries' },
    { value: `${a.credits} of ${a.entries}`, label: 'credit or better' },
  ]
})
</script>
