<template>
  <div>
    <PageHero title="Gallery" intro="Photos and videos from campus life." />
    <section class="wrap section">
      <template v-if="albums.length">
        <div v-for="a in albums" :key="a.slug" class="mb-10">
          <h2 class="mb-4 text-2xl font-semibold">{{ a.title }}</h2>
          <div v-if="a.photos.length" class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <figure v-for="(ph, i) in a.photos" :key="i">
              <a :href="ph.url" target="_blank" rel="noopener"><img :src="ph.url" :alt="ph.caption || a.title" loading="lazy" class="aspect-[4/3] w-full rounded-card object-cover" /></a>
              <figcaption v-if="ph.caption" class="mt-1 text-xs">{{ ph.caption }}</figcaption>
            </figure>
          </div>
          <p v-else class="text-sm">No photos in this album yet.</p>
        </div>
      </template>
      <template v-else>
        <SectionTitle title="Photo albums" sub="Albums will appear here once photos are added." />
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="a in fallbackAlbums" :key="a.slug" class="card overflow-hidden">
            <ImagePlaceholder ratio="aspect-[4/3]" class="!rounded-none" />
            <div class="p-4"><h3 class="font-sans font-semibold text-ink">{{ a.title }}</h3></div>
          </div>
        </div>
      </template>
    </section>
    <section class="wrap section">
      <SectionTitle title="Videos" />
      <div class="grid gap-4 md:grid-cols-2">
        <iframe v-for="v in videos" :key="v.youtubeId" class="aspect-video w-full rounded-card" :src="`https://www.youtube-nocookie.com/embed/${v.youtubeId}`" :title="v.title" loading="lazy" allowfullscreen />
      </div>
      <a :href="settings.social.youtube" target="_blank" rel="noopener" class="btn-outline mt-4">Watch on our YouTube channel</a>
    </section>
  </div>
</template>
<script setup lang="ts">
import { albums as fallbackAlbums, settings } from '~/data/site'
useSeo('Gallery', 'Photos and videos from campus life, classrooms, laboratories and events at Goldenheart College, Moloko-Asipa, Abeokuta.')
const { data: albums } = await useGallery()
const { data: videos } = await useVideos()
</script>
