<template>
  <div>
    <PageHero title="Policies and safeguarding" intro="How we keep students safe and the school orderly." />
    <section class="wrap section max-w-3xl space-y-4">
      <p v-if="!policies.length" class="text-sm">Policies will be published here soon.</p>
      <div v-for="p in policies" :id="p.id" :key="p.id" class="card p-6">
        <h2 class="text-2xl font-semibold">{{ p.title }}</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5"><li v-for="i in p.items" :key="i">{{ i }}</li></ul>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const { policies } = await useBlockContent()
useSeo('Policies and safeguarding', 'School rules, boarding guidelines and safeguarding at Goldenheart College, a Christian co-educational full boarding school in Abeokuta.')
</script>
