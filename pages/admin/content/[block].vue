<template>
  <BlockEditor v-if="b" :key="b.slug" :b="b" />
</template>
<script setup lang="ts">
import { blocks } from '~/data/adminBlocks'
definePageMeta({ layout: 'admin', middleware: 'admin' })
const b = computed(() => blocks.find(x => x.slug === useRoute().params.block))
if (!b.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
</script>
