<script setup>
const props = defineProps(['post']);

function formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('en', options);
}
</script>

<template>
  <div class="content-meta">
    <span>
      {{ 'updated: ' + formatDate(props.post.updatedAt) }}
    </span>
  </div>
</template>
