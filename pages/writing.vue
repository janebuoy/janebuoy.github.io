<script setup>
const route = useRoute();
const { data: posts } = await useAsyncData(() =>
  queryContent(route.path + '/').where({published: true}).find()
);
const post = {
  _path: '/writing',
};
</script>

<template>
  <main>
    <div class="grid-cols-6 gap-6 md:grid">
      <ContentCard class="col-span-3 md:col-span-4" :post="post">
        <ContentText>
          <h2>Entries</h2>
          <ul v-if="posts.length > 0">
            <li v-for="post in posts" :key="post._path" class="w-full">
              <div class="flex justify-between w-full">
                <span>
                  <NuxtLink :to="post._path" class="">{{
                    post.title
                  }}</NuxtLink>
                </span>
                <Date
                  :date="post.meta.updatedAt"
                  class="pl-2 font-serif md:pl-4 text-slate-900/80 dark:text-slate-300/80"
                />
              </div>
            </li>
          </ul>
					<p v-else>Oops, nothing here! The developer of this page seems to be busy writing code and has not yet focused on writing anything meaningful.</p>
					<p>For more, try your luck in the <a href="https://chaos.social/@mugraph">fediverse</a>!</p>
        </ContentText>
      </ContentCard>
      <WritingStats class="col-span-3 md:col-span-2" :posts="posts" />
    </div>
  </main>
</template>
