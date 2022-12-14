<script setup>
// const posts = await(await queryContent().where({ category: 'index' }).find()).sort()
const { data: posts } = await useAsyncData('in', () => {
  return queryContent('/').where({ category: { $in: ['index'] } }).find()
})
</script>

<template>
  <main class="prose">
    <div class="col-span-2">
      <ContentDoc />
    </div>
    <div class="content-item" :class="[!post.updatedAt ? 'pb-6' : null]" v-for="post in posts" :key="post.title">
      <ContentRenderer :value="post" />
      <span class="date" v-if="post.updatedAt">
        {{ "updated: " + formatDate(post.updatedAt) }}
      </span>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>