<script setup>
const props = defineProps(['posts']);
const posts = props.posts.filter((e) => e.category.includes('index'));
const usePattern = true;
const pattern = ['A', 'B', 'B', 'A'];
function arrangeCards(index) {
  return pattern[index % 4];
}
</script>

<template>
  <main>
    <div class="content-grid">
      <ContentCard
        v-for="(post, index) in posts"
        :key="post._path"
        :post="post"
        :class="[
          usePattern
            ? arrangeCards(index) === 'A'
              ? 'col-span-2'
              : 'col-span-4'
            : 'col-span-3',
        ]"
      >
        <ContentRenderer :value="post">
          <ContentText :class="post._path.slice(1) + '-text'">
            <h2 :id="post._path.slice(1)">
              <NuxtLink :to="{ path: '/', hash: '#' + post._path.slice(1) }">
                {{ post.title }}
              </NuxtLink>
            </h2>
            <ContentRendererMarkdown :value="post" />
          </ContentText>
        </ContentRenderer>
        <ContentMeta v-if="post.meta" :post="post" />
      </ContentCard>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.contact-text {
  :deep(li:before) {
    content: none;
  }
}
</style>
