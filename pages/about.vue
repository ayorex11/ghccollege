<template>
  <div>
    <PageHero title="About Goldenheart College" :intro="`Established in ${settings.founded}, with students since 2016/17. Co-educational, full boarding, Christian faith-based and open to families of all faiths.`" />

    <section v-if="about.welcome.length" class="wrap section max-w-4xl">
      <h2 class="h-section">Welcome</h2>
      <div class="prose-gh mt-4 font-serif text-[17px]"><p v-for="(p, i) in about.welcome" :key="i">{{ p }}</p></div>
    </section>

    <section class="wrap section grid gap-8 lg:grid-cols-2">
      <div>
        <h2 class="h-section">Our story</h2>
        <div class="prose-gh mt-4"><p v-for="(p, i) in about.story" :key="i">{{ p }}</p></div>
      </div>
      <img v-if="settings.aboutImage" :src="settings.aboutImage" alt="Goldenheart College campus" class="aspect-[4/3] w-full rounded-card object-cover" />
      <ImagePlaceholder v-else ratio="aspect-[4/3]" />
    </section>

    <section class="wrap section grid gap-4 md:grid-cols-2">
      <div class="card p-6 border-t-4 border-t-maroon"><h3 class="text-2xl font-semibold">Our vision</h3><p class="mt-3">{{ about.vision }}</p></div>
      <div class="card p-6 border-t-4 border-t-ember"><h3 class="text-2xl font-semibold">Our mission</h3><p class="mt-3">{{ about.mission }}</p></div>
    </section>

    <section class="wrap section">
      <SectionTitle title="Our core values" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="v in values" :key="v.title" class="card p-5"><h3 class="text-xl font-semibold text-maroon">{{ v.title }}</h3><p class="mt-2 text-sm">{{ v.text }}</p></div>
      </div>
    </section>

    <section v-if="scholarships.length" class="wrap section">
      <SectionTitle title="Scholarships and community" sub="Opening the door to education beyond our own fees." />
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="(sc, i) in scholarships" :key="i" class="card p-5"><h3 class="text-xl font-semibold text-maroon">{{ sc.title }}</h3><p class="mt-2 text-sm">{{ sc.text }}</p></div>
      </div>
    </section>

    <section v-if="chairman.note" class="wrap section">
      <div class="card grid gap-6 p-6 md:grid-cols-[200px_1fr] md:p-8">
        <img v-if="chairman.photo" :src="chairman.photo" :alt="chairman.name" class="aspect-[4/5] w-full max-w-[200px] rounded-card object-cover" />
        <ImagePlaceholder v-else ratio="aspect-[4/5]" class="max-w-[200px]" />
        <div>
          <h2 class="text-2xl font-semibold">A note from the Chairman</h2>
          <blockquote class="mt-3 font-serif text-lg italic leading-8 text-ink">“{{ chairman.note }}”</blockquote>
          <p class="mt-3 font-semibold text-ink">{{ chairman.name }}<br /><span class="font-normal">{{ chairman.title }}</span></p>
          <p v-if="chairman.bio" class="mt-3 text-sm">{{ chairman.bio }}</p>
        </div>
      </div>
    </section>

    <section v-if="symbols.anthem.length || symbols.creed.length" class="wrap section grid gap-4 md:grid-cols-2">
      <div v-if="symbols.anthem.length" class="card p-6">
        <h2 class="text-2xl font-semibold">School anthem</h2>
        <p class="mt-4 font-serif italic leading-8 text-ink"><template v-for="(l, i) in symbols.anthem" :key="i">{{ l }}<br /></template></p>
      </div>
      <div v-if="symbols.creed.length" class="card p-6">
        <h2 class="text-2xl font-semibold">School creed</h2>
        <p class="mt-4 font-serif italic leading-8 text-ink"><template v-for="(l, i) in symbols.creed" :key="i">{{ l }}<br /></template></p>
      </div>
    </section>

    <div class="wrap"><StarDivider /></div>

    <section v-if="principal.message.length" id="principal" class="wrap section grid gap-8 lg:grid-cols-[320px_1fr]">
      <img v-if="principal.photo" :src="principal.photo" :alt="principal.name" class="aspect-[4/5] w-full rounded-card object-cover" />
      <ImagePlaceholder v-else ratio="aspect-[4/5]" />
      <div>
        <h2 class="h-section">Principal’s message</h2>
        <div class="prose-gh mt-4 font-serif text-[17px]"><p v-for="(p, i) in principal.message" :key="i">{{ p }}</p></div>
        <p class="mt-2 font-semibold text-ink">{{ principal.name }}<br /><span class="font-normal">{{ principal.title }}</span></p>
      </div>
    </section>

    <section class="wrap section">
      <SectionTitle title="Leadership and board" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="m in [...leadership, ...board]" :key="m.name" class="card p-5 text-center">
          <div class="mx-auto h-16 w-16 rounded-full bg-maroon-soft border border-gold/40 grid place-items-center font-serif text-xl text-maroon">{{ initials(m.name) }}</div>
          <p class="mt-3 font-semibold text-ink">{{ m.name }}</p><p class="text-sm">{{ m.role }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { settings, values, leadership, board } from '~/data/site'
const { principal, about, symbols, scholarships, chairman } = await useBlockContent()
useSeo('About', 'The story, vision, mission, anthem and leadership of Goldenheart College, a Christian co-educational full boarding school in Abeokuta, Ogun State.')
const initials = (n: string) => n.replace(/^(Mr|Mrs|Dr|Chief)\.?\s/i, '').split(' ').map(w => w[0]).slice(0, 2).join('')
</script>
