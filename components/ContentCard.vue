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
  @apply bg-pink-200/20 border-pink-700;

  :slotted(.content-text) {
    a {
      @apply text-pink-700;
      @apply hover:bg-gradient-to-tl hover:from-orange-100 hover:via-rose-100 hover:to-pink-200;
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
