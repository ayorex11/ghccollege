<template>
  <div>
    <PageHero title="About Goldenheart College" :intro="`Founded in ${settings.founded}. Co-educational, full boarding, Christian faith-based and open to families of all faiths.`" />

    <section class="wrap section grid gap-8 lg:grid-cols-2">
      <div>
        <h2 class="h-section">Our story</h2>
        <div class="prose-gh mt-4"><p v-for="(p, i) in history" :key="i">{{ p }}</p></div>
      </div>
      <ImagePlaceholder label="Campus photo (replace in admin)" ratio="aspect-[4/3]" />
    </section>

    <section class="wrap section grid gap-4 md:grid-cols-2">
      <div class="card p-6 border-t-4 border-t-maroon"><h3 class="text-2xl font-semibold">Our vision</h3><p class="mt-3">{{ vision }}</p></div>
      <div class="card p-6 border-t-4 border-t-ember"><h3 class="text-2xl font-semibold">Our mission</h3><p class="mt-3">{{ mission }}</p></div>
    </section>

    <section class="wrap section">
      <SectionTitle title="Our core values" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="v in values" :key="v.title" class="card p-5"><h3 class="text-xl font-semibold text-maroon">{{ v.title }}</h3><p class="mt-2 text-sm">{{ v.text }}</p></div>
      </div>
    </section>

    <div class="wrap"><StarDivider /></div>

    <section id="principal" class="wrap section grid gap-8 lg:grid-cols-[320px_1fr]">
      <ImagePlaceholder label="Principal (photo to upload)" ratio="aspect-[4/5]" />
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
import { settings, history, vision, mission, values, principal, leadership, board } from '~/data/site'
useSeo('About', 'The story, vision, mission and leadership of Goldenheart College, Abeokuta.')
const initials = (n: string) => n.replace(/^(Mr|Mrs|Dr|Chief)\.?\s/i, '').split(' ').map(w => w[0]).slice(0, 2).join('')
</script>
