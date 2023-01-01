<script setup>
const route = useRoute();
const { data } = await useAsyncData(() => queryContent(route.path).findOne());
</script>

<template>
  <main>
    <div class="md:grid gap-6 grid-cols-6">
      <div
        class="order-first md:order-last col-span-3 md:col-span-2 hidden md:block"
      >
        <ContentCard class="md:sticky md:top-6 mt-36">
          <ContentText>
            <ContentToc :toc="data.body.toc" />
          </ContentText>
        </ContentCard>
      </div>
      <ContentCard
        class="col-span-3 md:col-span-4 order-last md:order-first"
        :post="data"
      >
        <ContentRenderer :value="data">
          <ContentText class="sm:p-12 md:p-16 lg:p-20">
            <h1>{{ data.title }}</h1>
            <ContentToc
              :toc="data.body.toc"
              class="border-indigo-700 border-y border-dotted pt-6 pb-4 mb-6 md:hidden"
            />
            <ContentRendererMarkdown :value="data" />
          </ContentText>
        </ContentRenderer>
      </ContentCard>
    </div>
  </main>
</template>
