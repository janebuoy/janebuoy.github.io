<script setup>
import { useBreakpointTailwindCSS } from "vue-composable";

/**
 * it uses the default config found :
 * https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 **/
const { current } = useBreakpointTailwindCSS();
const config = useAppConfig()
const active = ref(true)

/* Fetch Content */
const { data: posts } = await useAsyncData("in", () => {
  return queryContent("/")
    .where({ category: { $in: ["page"] } })
    .find();
});

useHead({
  title: config.title + ' | ' + config.meta[0].content,
  meta: config.meta
})

watch(current, (v) => {
  if (['md', 'lg', 'xl'].includes(v)) {
    active.value = true
  } else {
    active.value = false
  }
})

function toggle() {
  active.value = !active.value
}

function formatDate(date) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(date).toLocaleDateString("en", options);
};

</script>

<template>
  <main>
    <div class="navbar">
      <h1>{{ config.title }}</h1>
      <MenuButton @click.prevent="toggle" />
      <Nav :posts="posts" v-show="active" />
    </div>

    <div class="content-grid">
      <div class="content-card" v-for="post in posts" :key="post.title">
        <ContentRenderer :value="post" class="content-text" />
        <div class="content-meta" v-if="post.updatedAt">
          <span> {{ "updated: " + formatDate(post.updatedAt) }}
          </span>
        </div>
      </div>
      <Contact />

    </div>
  </main>
</template>
