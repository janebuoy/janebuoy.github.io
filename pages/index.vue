<script setup>
import { useBreakpointTailwindCSS } from 'vue-composable';

/**
 * it uses the default config found :
 * https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 **/
const { current } = useBreakpointTailwindCSS();
const config = useAppConfig();
const active = ref(true);

/* Fetch Content */
const { data: posts } = await useAsyncData('in', () => {
  return queryContent('/')
    .where({ category: { $in: ['page'] } })
    .find();
});

useHead({
  title: config.title + ' | ' + config.meta[0].content,
  meta: config.meta,
});

watch(current, (v) => {
  if (['md', 'lg', 'xl'].includes(v)) {
    active.value = true;
  } else {
    active.value = false;
  }
});

function toggle() {
  active.value = !active.value;
}
</script>

<template>
  <nav>
    <h1>{{ config.title }}</h1>
    <MenuButton @click.prevent="toggle" />
    <Nav v-show="active" :posts="posts" />
  </nav>
  <main>
    <div class="content-grid">
      <ContentCard v-for="post in posts" :key="post._path" :post="post">
        <ContentRenderer :value="post">
          <ContentText>
            <h2 :id="post._path.slice(1)">
              <NuxtLink :to="{ path: '/', hash: '#' + post._path.slice(1) }">
                {{ post.title }}
              </NuxtLink>
            </h2>
            <ContentRendererMarkdown :value="post" />
          </ContentText>
        </ContentRenderer>
        <ContentMeta v-if="post.updatedAt" :post="post" />
      </ContentCard>
    </div>
  </main>
</template>
