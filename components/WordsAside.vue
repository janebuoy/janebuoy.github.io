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
  const result = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (result[tag]) {
        result[tag]++;
      } else {
        result[tag] = 1;
      }
    });
  });
  return result;
}

function sortedTags(obj) {
  return Object.entries(obj).sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  });
}
</script>

<template>
  <div class="col-span-1">
    <ContentCard class="max-md:px-4 sm:px-6 px-8 pt-10 pb-2">
      <div class="font-serif pb-8">
        <h2 class="text-xl flex justify-between mt-0">
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
          v-for="tag in sortedTags(tags(posts))"
          :key="tag"
          class="flex justify-between"
        >
          <span
            ><NuxtLink :to="{ path: '/words', query: { tags: tag[0] } }">{{
              tag[0]
            }}</NuxtLink></span
          >
          <span>{{ tag[1] }}</span>
        </div>
      </div>
      <div class="font-serif pb-8">
        <h2 class="text-xl mt-0">Stats</h2>
        <div class="flex justify-between">
          <span>Total:</span>
          <span>{{ props.posts.length }}</span>
        </div>
        <div v-for="year in years" :key="year" class="flex justify-between">
          <span>{{ year }}</span>
          <span>{{ currentYearsNumbers(props.posts, year) }}</span>
        </div>
      </div>
    </ContentCard>
  </div>
</template>
