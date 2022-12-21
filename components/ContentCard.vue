<script setup>
const route = useRoute();
const props = defineProps(['post']);
</script>

<template>
  <div
    class="content-card"
    :class="[
      route.hash.slice(1) === props.post._path.slice(1) ? 'selected' : null,
    ]"
  >
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.selected {
  @apply bg-gradient-to-tl from-orange-100/50 via-rose-100/50 to-pink-200/50 border-pink-700;
  @apply dark:from-orange-900/10 dark:via-rose-900/20 dark:to-pink-800/20;

  :slotted(.content-text) {
    a {
      @apply text-pink-700 dark:text-pink-600;
      @apply hover:bg-gradient-to-tl hover:from-orange-100 hover:via-rose-100 hover:to-pink-200;  
      @apply hover:dark:from-orange-900/10 hover:dark:via-rose-900/20 hover:dark:to-pink-800/20;
    }
    svg {
      @apply text-pink-700;
    }
  }

  :slotted(.content-meta) {
    @apply border-pink-700 text-pink-700;
  }
}
</style>
