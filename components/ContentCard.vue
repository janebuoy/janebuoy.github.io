<script setup>
const route = useRoute();
const props = defineProps(['path']);
</script>

<template>
  <div
    v-if="props.path"
    class="font-light content-card justify-between"
    :class="[
      route.hash.slice(1) === props.path.slice(1) ||
      route.href.slice(1) === props.path.slice(1)
        ? 'selected'
        : null,
    ]"
  >
    <slot />
  </div>
  <div v-else class="font-light content-card">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.selected {
  @apply bg-gradient-to-tl from-orange-100/30 via-rose-100/40 to-pink-200/30 border-pink-700;
  @apply dark:from-orange-900/5 dark:via-rose-900/10 dark:to-pink-800/10;

  :deep(a) {
    @apply text-pink-700 dark:text-pink-400;
    @apply hover:bg-gradient-to-tl hover:from-orange-100 hover:via-rose-100 hover:to-pink-200;
    @apply hover:dark:from-orange-900/10 hover:dark:via-rose-900/20 hover:dark:to-pink-800/20;
  }

  :deep(h2 > a) {
    @apply text-pink-700 dark:text-pink-500;
  }

  :deep(.content-meta) {
    @apply border-pink-700;
  }

  :deep(.content-meta-field) {
    @apply border-pink-700;
  }

  :deep(#toc) {
    @apply border-pink-900/80;
  }
}
</style>
