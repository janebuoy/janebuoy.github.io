<script setup>
const route = useRoute();
const { data: posts } = await useAsyncData(() =>
  queryContent(route.path + '/').find()
);
const post = {
  _path: '/blog',
};
</script>

<template>
  <main>
    <div class="md:grid gap-6 grid-cols-6">
      <ContentCard class="col-span-3 md:col-span-4" :post="post">
        <ContentText>
          <h2>Blog Entries</h2>
          <ul>
            <li v-for="post in posts" :key="post._path" class="w-full">
              <div class="w-full flex justify-between">
                <span>
                  <NuxtLink :to="post._path" class="">{{
                    post.title
                  }}</NuxtLink>
                </span>
                <Date
                  :date="post.meta.updatedAt"
                  class="pl-2 md:pl-4 font-serif text-slate-900/80 dark:text-slate-300/80"
                />
              </div>
            </li>
          </ul>
        </ContentText>
      </ContentCard>
      <BlogStats class="col-span-3 md:col-span-2" :posts="posts" />
    </div>
  </main>
</template>
