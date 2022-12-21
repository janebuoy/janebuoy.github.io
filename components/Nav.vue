<script setup>
const route = useRoute();
const props = defineProps(['posts']);

const pathArr = props.posts.map((e) => e._path.slice(1));
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="(post, index) in props.posts"
        :key="post._path"
        :class="[
          route.hash.slice(1) === post._path.slice(1) ? 'selected' : null,
          pathArr.indexOf(route.hash.slice(1)) === index + 1
            ? 'md:border-r-0 md:border-b border-b-0'
            : null,
        ]"
      >
        <NuxtLink
          :key="post._path.slice(1)"
          :to="{ path: '/', hash: '#' + post._path.slice(1) }"
        >
          {{ post._path === "/hello-im-janne" ? 'About Me' : post.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
.selected {
  @apply bg-gradient-to-tl from-orange-100/50 via-rose-100/50 to-pink-200/50 border-pink-700 md:border-l border-t;
  @apply dark:from-orange-900/20 dark:via-rose-900/20 dark:to-pink-800/20;
  a {
    @apply text-pink-700;
    @apply hover:bg-gradient-to-bl hover:from-orange-100 hover:via-rose-100 hover:to-pink-100;
    @apply hover:dark:from-orange-900/10 hover:dark:via-rose-900/20 hover:dark:to-pink-800/20;
  }
}
</style>
