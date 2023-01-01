<script setup>
const props = defineProps(['post']);
</script>

<template>
  <div class="content-meta">
    <span v-if="props.post.meta.updatedAt" class="content-meta-field">
      updated: <Date :date="props.post.meta.updatedAt" />
    </span>
    <span v-if="props.post.meta.imprint" class="content-meta-field">
      <NuxtLink :to="props.post.meta.imprint">Imprint</NuxtLink>
    </span>
    <span v-if="props.post.meta.privacy" class="content-meta-field">
      <NuxtLink :to="props.post.meta.privacy">Privacy</NuxtLink>
    </span>
  </div>
</template>
