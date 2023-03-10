<script setup>
const props = defineProps(['time']);
function formatDate(time) {
  const options = { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
  return new Date(time).toLocaleTimeString(undefined, options);
}
</script>

<template>
  <span>
    {{ formatDate(props.time) }}
  </span>
</template>
