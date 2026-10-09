<template>
  <div v-if="res"><ResourceManager :key="res.slug" :res="res" /></div>
</template>
<script setup lang="ts">
import { resources } from '~/data/adminResources'
definePageMeta({ layout: 'admin', middleware: 'admin' })
const res = computed(() => resources.find(r => r.slug === useRoute().params.resource))
if (!res.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
</script>
