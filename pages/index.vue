<script setup>
const { data: posts } = await useAsyncData("in", () => {
  return queryContent("/")
    .where({ category: { $in: ["index"] } })
    .find();
});

const formatDate = (date) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(date).toLocaleDateString("en", options);
};
</script>

<template>
  <main>
    <Header />
    <div class="content-grid">
      <div class="content-item" :class="[!post.updatedAt ? 'pb-6' : null]" v-for="post in posts" :key="post.title">
        <!-- <img v-if="post.profile" :src="post.profile" class="profile" /> -->
        <ContentRenderer :value="post" />
        <span class="date" v-if="post.updatedAt">
          {{ "updated: " + formatDate(post.updatedAt) }}
        </span>
      </div>
    </div>
  </main>
</template>
