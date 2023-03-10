<script setup>
const props = defineProps(['date']);
function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
}
</script>

<template>
  <span>
    {{ formatDate(props.date) }}
  </span>
</template>
