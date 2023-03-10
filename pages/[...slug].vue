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
           <div v-if="data.meta.createdAt" class="-z-10 flex justify-end font-serif text-sm text-slate-900/80 dark:text-slate-200/80 ">
              <div v-if="!data.meta.updatedAt" class="p-2 border-b border-l border-pink-700 rounded-tr bg-gradient-to-bl from-orange-50 via-amber-50 to-orange-50 dark:bg-none dark:bg-indigo-900/10">published: <Date :date="data.meta.createdAt" /></div>
              <div v-else class="p-2 border-b border-l border-pink-700 rounded-tr bg-gradient-to-bl from-orange-50 via-amber-50 to-orange-50 dark:bg-none dark:bg-indigo-900/10">edited: <Date :date="data.meta.updatedAt" /> at <Time :time="data.meta.updatedAt" /></div>
            </div>
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
    @apply dark:from-rose-600/50 dark:via-rose-500/80 dark:to-pink-600/80 bg-clip-text text-transparent;
  }
</style>