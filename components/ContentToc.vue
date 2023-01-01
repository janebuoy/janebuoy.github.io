<script setup>
defineProps(['toc']);
</script>

<template>
  <div id="toc">
    <h2 class="text-lg">Table of Contents</h2>
    <ol>
      <li v-for="link in toc.links" :key="link.id">
        <NuxtLink :to="'#' + link.id">{{ link.text }}</NuxtLink>
        <ol v-if="link.children">
          <li v-for="child in link.children" :key="child.id">
            <NuxtLink :to="'#' + child.id">{{ child.text }}</NuxtLink>
          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>
