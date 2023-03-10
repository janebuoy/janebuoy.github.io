<script setup>
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
</script>

<template>
  <div class="col-span-1">
    <ContentCard>
      <ContentText class="font-serif">
        <h2 class="text-lg">Stats</h2>
        <div class="flex flex-col text-slate-900/80 dark:text-slate-300/80">
          <div class="flex justify-between">
            <span>Total:</span>
            <span>{{ props.posts.length }}</span>
          </div>
          <div v-for="year in years" :key="year" class="flex justify-between">
            <span>{{ year }}</span>
            <span>{{ currentYearsNumbers(props.posts, year) }}</span>
          </div>
        </div>
      </ContentText>
    </ContentCard>
  </div>
</template>
