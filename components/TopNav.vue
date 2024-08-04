<script setup>
import { useBreakpointTailwindCSS } from 'vue-composable';

defineProps(['posts']);

const colorMode = useColorMode();

const { current } = useBreakpointTailwindCSS();
const config = useAppConfig();
const active = ref(true);

function toggle() {
  active.value = !active.value;
}

function toggleColor() {
  if (colorMode.preference != 'light') colorMode.preference = 'light';
  else if (colorMode.preference != 'dark') colorMode.preference = 'dark';
}

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
</script>

<template>
  <nav class="items-center mb-2 font-sans md:flex md:mb-4">
    <div class="flex items-center justify-between">
      <h1 class="hidden mb-0 text-2xl xs:text-4xl md:inline-block">
        <a href="/" class="bg-gradient-to-tl dark:!from-pink-700 !from-pink-600 dark:!via-purple-400 !via-purple-500 dark:!to-indigo-600 !to-indigo-700 inline-block dark:!text-white !text-black dark:hover:!text-transparent hover:!text-transparent bg-clip-text font-semibold hover:no-underline">
        {{ config.title }}
        </a>
      </h1>
      <h1 class="mb-0 text-3xl xs:text-4xl md:hidden">
        <a href="/" class="bg-gradient-to-tl dark:!from-pink-700 !from-pink-600 dark:!via-purple-400 !via-purple-500 dark:!to-indigo-600 !to-indigo-700 inline-block dark:!text-white !text-black dark:hover:!text-transparent hover:!text-transparent bg-clip-text font-semibold hover:no-underline">
        Mugraph
        </a>
      </h1>
      <div class="flex items-center justify-end md:hidden">
        <Button
          v-if="colorMode.value === 'dark'"
          icon="sun"
          size="base"
          class="mt-0 mr-2"
          @click="toggleColor()"
        />
        <Button
          v-else
          icon="moon"
          size="base"
          class="mt-0 mr-2"
          @click="toggleColor()"
        />

        <Button
          v-if="!active"
          icon="bars"
          size="base"
          class="md:hidden"
          @click.prevent="toggle()"
        />
        <Button
          v-else
          icon="x-mark"
          size="base"
          class="md:hidden"
          @click.prevent="toggle()"
        />
      </div>
    </div>
    <div class="flex justify-end w-full">
      <TopNavMenu v-show="active" :posts="posts" />
      <Button
        v-if="colorMode.value === 'dark'"
        icon="sun"
        size="base"
        class="hidden mt-0 ml-2 md:block md:mt-4"
        @click="toggleColor()"
      />
      <Button
        v-else
        icon="moon"
        size="base"
        class="hidden mt-0 ml-2 md:block md:mt-4"
        @click="toggleColor()"
      />
    </div>
  </nav>
</template>