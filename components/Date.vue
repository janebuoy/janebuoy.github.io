<script setup>
const props = defineProps(['date']);
function formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
}
</script>

<template>
  <span>
    {{ formatDate(props.date) }}
  </span>
</template>
