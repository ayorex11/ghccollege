<template>
  <div>
    <PageHero title="Gallery" intro="Photos and videos from campus life." />
    <section class="wrap section">
      <SectionTitle title="Photo albums" sub="Albums are added from the admin dashboard." />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="a in albums" :key="a.slug" class="card card-hover overflow-hidden">
          <ImagePlaceholder ratio="aspect-[4/3]" class="!rounded-none" />
          <div class="p-4"><h3 class="font-semibold text-ink font-sans">{{ a.title }}</h3><p class="text-sm">{{ a.count }} photos</p></div>
        </div>
      </div>
    </section>
    <section class="wrap section">
      <SectionTitle title="Videos" />
      <div class="grid gap-4 md:grid-cols-2">
        <template v-for="v in videos" :key="v.title">
          <iframe v-if="v.youtubeId" class="aspect-video w-full rounded-card" :src="`https://www.youtube-nocookie.com/embed/${v.youtubeId}`" :title="v.title" loading="lazy" allowfullscreen />
        </template>
      </div>
      <a :href="settings.social.youtube" target="_blank" rel="noopener" class="btn-outline mt-4">Watch on our YouTube channel</a>
    </section>
  </div>
</template>
<script setup lang="ts">
import { albums, videos, settings } from '~/data/site'
useSeo('Gallery', 'Photos and videos from Goldenheart College.')
</script>
