<script setup>
const { data: posts } = await useAsyncData(() => {
  return queryContent('/').find();
});

useHead({
  link: [{
    rel: 'alternate',
    type: 'application/rss+xml',
    title: 'Micrograph',
    href: 'https://micrograph.io/feed'
  },
  {
    rel: 'alternate',
    type: 'application/atom+xml',
    title: 'Micrograph',
    href: 'https://micrograph.io/atom'
  }]
})
</script>

<template>
  <TopNav :posts="posts" />
  <NuxtPage class="prose text-left scroll-smooth" :posts="posts" />
</template>
