<script setup>

defineProps(['posts'])
</script>

<template>
  <nav>
    <ul>
      <li v-for="post in posts" :key="post.title">
        <a :href="'#' + post._path.slice(1)">
          {{ post.title === "Hello, I'm Janne" ? 'About Me' : post.title }}
        </a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
    </ul>
  </nav>
</template>