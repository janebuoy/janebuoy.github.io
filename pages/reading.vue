<script setup>
const route = useRoute();
const { data: posts } = await useAsyncData(() =>
  queryContent(route.path + '/')
    .where({ published: true })
    .find()
);
console.log(process.env.NUXT_ENV_MINIFLUX_API_TOKEN);
const post = {
  _path: '/reading',
};
</script>

<template>
  <main>
    <div class="grid-cols-6 gap-6 md:grid">
      <ContentCard class="col-span-3 md:col-span-4" :post="post">
        <ContentText> Hello! Welcome to {{ post._path }} </ContentText>
      </ContentCard>
      <WritingStats class="col-span-3 md:col-span-2" :posts="posts" />
    </div>
  </main>
</template>
