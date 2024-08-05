<script setup>
const route = useRoute();
const props = defineProps(['posts']);
function formatDate(date, options) {
  return new Date(date).toLocaleDateString('en', options);
}
const options = { year: 'numeric' };
const years = [
  ...new Set(props.posts.map((e) => formatDate(e.meta.updatedAt, options))),
].sort((a, b) => b - a);

function currentYearsNumbers(posts, year) {
  let count = 0;
  count = posts.filter(
    (e) => formatDate(e.meta.updatedAt, options) === year
  ).length;
  return count;
}

function tags(posts) {
  const tagCount = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagCount[tag]) {
        tagCount[tag]++;
      } else {
        tagCount[tag] = 1;
      }
    });
  });
  return tagCount;
}
</script>

<template>
  <div class="col-span-1">
    <ContentCard>
      <ContentText class="font-serif">
        <h2 class="text-xl">Stats</h2>
        <div class="flex justify-between">
          <span>Total:</span>
          <span>{{ props.posts.length }}</span>
        </div>
        <div v-for="year in years" :key="year" class="flex justify-between">
          <span>{{ year }}</span>
          <span>{{ currentYearsNumbers(props.posts, year) }}</span>
        </div>
      </ContentText>
      <ContentText class="font-serif">
        <h2 class="text-xl flex justify-between">
          Tags
          <button
            v-if="route.query['tags']"
            class="text-pink-500 inline-block text-sm border-solid border rounded-sm border-pink-600/60 px-1"
            @click="$router.push({ path: '/words' })"
          >
            Clear
          </button>
        </h2>
        <div
          v-for="(count, tag) in tags(posts)"
          :key="tag"
          class="flex justify-between"
        >
          <span
            ><NuxtLink :to="{ path: '/words', query: { tags: tag } }">{{
              tag
            }}</NuxtLink></span
          >
          <span>{{ count }}</span>
        </div>
      </ContentText>
    </ContentCard>
  </div>
</template>
