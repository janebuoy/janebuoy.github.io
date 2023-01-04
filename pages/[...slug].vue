<script setup>
const route = useRoute();
const { data } = await useAsyncData(() => queryContent(route.path).findOne());
</script>

<template>
  <main>
    <div class="md:grid gap-0 grid-cols-12">
      <div
        class="order-first md:order-last md:col-span-3 hidden md:block"
      >
        <ContentCard class="md:sticky md:top-6 mt-36 border-l-0 rounded-none rounded-r">
          <ContentText class="px-6 py-8">
            <ContentToc :toc="data.body.toc" />
          </ContentText>
        </ContentCard>
      </div>
      <ContentCard
        class="md:col-span-9 order-last md:order-first"
        :post="data"
      >
        <ContentRenderer :value="data">
          <ContentText >
            <h1>
              <span class="font-bold">{{ data.title.substring(0,[...data.title].length * .25) }}</span>
              <span class="font-semibold">{{ data.title.substring([...data.title].length * .25, [...data.title].length * .50) }}</span>
              <span class="font-medium">{{ data.title.substring([...data.title].length * .50, [...data.title].length * .75) }}</span>
              <span class="font-normal">{{ data.title.substring([...data.title].length * .75, [...data.title].length) }}</span>

            </h1>
            <ContentToc
              :toc="data.body.toc"
              class="border-indigo-700 border-y border-dotted pt-6 pb-1 mb-6 md:hidden"
            />
            <ContentRendererMarkdown :value="data" />
          </ContentText>
        </ContentRenderer>
      </ContentCard>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
  h1 {
    @apply bg-gradient-to-tl from-orange-200 via-rose-600/90 to-pink-900;
    @apply dark:from-orange-900/10 dark:via-rose-900/20 dark:to-pink-800/20 bg-clip-text text-transparent;
    
  }
</style>