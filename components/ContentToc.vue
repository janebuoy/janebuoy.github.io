<script setup>
defineProps(['toc']);
</script>

<template>
  <div id="toc" class="leading-5">
    <h2 class="text-lg">Table of Contents</h2>
    <ol class="">
      <li v-for="link in toc.links" :key="link.id">
        <NuxtLink :to="'#' + link.id">{{ link.text }}</NuxtLink>
        <ol v-if="link.children" class="mb-0">
          <li v-for="child in link.children" :key="child.id">
            <NuxtLink :to="'#' + child.id">{{ child.text }}</NuxtLink>
          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>
