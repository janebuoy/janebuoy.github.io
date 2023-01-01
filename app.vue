<script setup>
const { data: posts } = await useAsyncData(() => {
  return queryContent('/').find();
});
</script>

<template>
  <TopNav :posts="posts" />
  <NuxtPage class="prose text-left scroll-smooth" :posts="posts" />
</template>
