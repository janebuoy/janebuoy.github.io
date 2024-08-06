<script setup>
const route = useRoute();
const post = {
  _path: '/words',
};

// see: https://nuxt.com/docs/migration/component-options#watchquery
const { data: posts, refresh } = await useAsyncData(() =>
  queryContent(route.path + '/')
    .where({ published: true })
    .where({ tags: { $in: route.query.tags } })
    .find()
);

watch(
  () => route.query,
  () => refresh()
);
</script>

<template>
  <main>
    <div class="grid-cols-6 gap-6 md:grid">
      <ContentCard
        class="col-span-3 md:col-span-4 flex justify-between"
        :post="post"
      >
        <ContentText>
          <h2>
            Words
            <span v-if="'tags' in route.query" class="text-lg">
              (filtered by tags)
            </span>
            <span v-if="'year' in route.query" class="text-lg">
              (filtered by year)
            </span>
            <span v-else class="text-lg"></span>
          </h2>
          <ul v-if="posts.length > 0">
            <li v-for="post in posts" :key="post._path" class="w-full flex">
              <div class="flex justify-between w-full">
                <span>
                  <NuxtLink :to="post._path" class="">{{
                    post.title
                  }}</NuxtLink>
                </span>
                <Date
                  :date="post.meta.updatedAt"
                  class="text-sm mt-1 pl-2 font-serif md:pl-4 text-slate-900/80 dark:text-slate-300/80"
                />
              </div>
            </li>
          </ul>
          <p v-else>Oops, nothing here!</p>
        </ContentText>
        <ContentText>
          <p>
            For more, head over to the
            <a href="https://chaos.social/@mugraph">fediverse</a>!
          </p>
        </ContentText>
      </ContentCard>
      <WordsAside class="col-span-3 md:col-span-2" :posts="posts" />
    </div>
  </main>
</template>
