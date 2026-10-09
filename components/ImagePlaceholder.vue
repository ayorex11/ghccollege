<template>
  <div class="relative overflow-hidden rounded-card bg-gradient-to-br from-maroon-dark via-maroon to-ember" :class="ratio">
    <img src="/logo.jpg" alt="" class="absolute inset-0 m-auto h-1/2 opacity-20 mix-blend-luminosity" />
    <p v-if="label" class="absolute bottom-2 left-3 text-xs font-semibold text-white/80">{{ label }}</p>
  </div>
</template>
<script setup lang="ts">withDefaults(defineProps<{ label?: string; ratio?: string }>(), { ratio: 'aspect-[16/10]' })</script>
