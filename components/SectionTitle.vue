<template>
  <div class="mb-6 md:mb-8">
    <h2 class="h-section">{{ title }}</h2>
    <p v-if="sub" class="mt-2 max-w-2xl text-[17px] leading-[26px]">{{ sub }}</p>
  </div>
</template>
<script setup lang="ts">defineProps<{ title: string; sub?: string }>()</script>
