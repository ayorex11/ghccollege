<template>
  <div>
    <section class="bg-maroon text-white">
      <div class="wrap grid items-center gap-8 py-10 md:py-16 lg:grid-cols-2">
        <div>
          <span class="chip !bg-white/10 !text-gold-light">Co-educational full boarding school, ages 10 to 16</span>
          <h1 class="mt-4 !text-white h-display">{{ settings.heroTitle }}</h1>
          <p class="mt-4 text-white/85 text-[17px] leading-[26px]">A Christian faith-based boarding school on 35 acres near Abeokuta, open to families of all faiths. A Nigerian and British blend curriculum, with WAEC and NECO preparation.</p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <a :href="wa()" target="_blank" rel="noopener" class="btn-wa"><Icon name="chat" /> Enquire on WhatsApp</a>
            <NuxtLink to="/about" class="btn border-[1.5px] border-gold-light text-white hover:bg-white/10">About the school</NuxtLink>
          </div>
          <p class="mt-6 font-serif tracking-[0.08em] text-gold-light text-sm">★ {{ settings.motto }} ★</p>
        </div>
        <ImagePlaceholder label="Campus photo (replace in admin)" ratio="aspect-[4/3]" />
      </div>
    </section>

    <section class="wrap -mt-6 relative">
      <div class="card grid grid-cols-2 md:grid-cols-4 divide-line">
        <div v-for="s in stats" :key="s.label" class="p-4 text-center">
          <p class="font-serif text-3xl font-bold text-maroon">{{ s.value }}</p><p class="text-sm">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <section v-if="principal.excerpt" class="wrap section grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
      <img v-if="principal.photo" :src="principal.photo" :alt="principal.name" class="aspect-[4/5] w-full max-w-xs rounded-card object-cover" />
      <ImagePlaceholder v-else label="Principal (photo to upload)" ratio="aspect-[4/5]" class="max-w-xs" />
      <div>
        <h2 class="h-section">A word from the Principal</h2>
        <blockquote class="mt-4 font-serif italic text-xl leading-8 text-ink">“{{ principal.excerpt }}”</blockquote>
        <p class="mt-4 font-semibold text-ink">{{ principal.name }}, {{ principal.title }}</p>
        <NuxtLink to="/about#principal" class="btn-outline mt-4">Read the full message</NuxtLink>
      </div>
    </section>

    <div class="wrap"><StarDivider /></div>

    <section class="wrap section">
      <SectionTitle title="What we stand for" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="v in values" :key="v.title" class="card p-5"><h3 class="text-xl font-semibold text-maroon">{{ v.title }}</h3><p class="mt-2 text-sm">{{ v.text }}</p></div>
      </div>
    </section>

    <section class="wrap section">
      <div class="flex items-end justify-between"><SectionTitle title="Upcoming events" /><NuxtLink to="/events" class="text-sm font-semibold text-maroon mb-8">All events</NuxtLink></div>
      <div class="grid gap-3 md:grid-cols-2"><EventRow v-for="e in events.slice(0, 4)" :key="e.slug" :e="e" /></div>
    </section>

    <section class="wrap section">
      <div class="flex items-end justify-between"><SectionTitle title="News and achievements" /><NuxtLink to="/blog" class="text-sm font-semibold text-maroon mb-8">All news</NuxtLink></div>
      <div class="grid gap-4 md:grid-cols-3"><PostCard v-for="p in posts.slice(0, 3)" :key="p.slug" :p="p" /></div>
    </section>

    <section class="wrap section">
      <SectionTitle title="What parents say" />
      <div class="grid gap-4 md:grid-cols-3"><Quote v-for="(t, i) in testimonials" :key="i" :t="t" /></div>
    </section>

    <section class="wrap section"><BroadcastSignup /></section>
  </div>
</template>
<script setup lang="ts">
import { settings, stats, values, wa } from '~/data/site'
const { principal } = await useBlockContent()
const { data: allEvents } = await useEvents()
const { data: posts } = await usePosts()
const { data: testimonials } = await useTestimonials()
const events = computed(() => {
  const t = new Date().toISOString().slice(0, 10)
  const up = allEvents.value.filter(e => e.date >= t)
  return up.length ? up : allEvents.value.slice(-4)
})
useSeo('Home', 'Goldenheart College is a co-educational Christian full boarding school near Abeokuta, Ogun State, for ages 10 to 16.')
</script>
