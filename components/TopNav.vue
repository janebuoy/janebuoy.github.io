<script setup>
import { useBreakpointTailwindCSS } from 'vue-composable';
import { useDark, useToggle } from '@vueuse/core';

defineProps(['posts']);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { current } = useBreakpointTailwindCSS();
const config = useAppConfig();
const active = ref(true);

function toggle() {
  active.value = !active.value;
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
  <nav class="md:flex items-center mb-2 md:mb-4">
    <div class="flex items-center justify-between">
      <h1 class="mb-0 text-2xl xs:text-4xl">{{ config.title }}</h1>
      <div class="flex items-center justify-end md:hidden">
        <Button
          v-if="isDark"
          icon="moon"
          size="base"
          class="mt-0 mr-2"
          @click="toggleDark()"
        />
        <Button
          v-else
          icon="sun"
          size="base"
          class="mt-0 mr-2"
          @click="toggleDark()"
        />
        <Button
          v-if="!active"
          icon="bars"
          size="base"
          class="md:hidden"
          @click.prevent="toggle"
        />
        <Button
          v-else
          icon="x-mark"
          size="base"
          class="md:hidden"
          @click.prevent="toggle"
        />
      </div>
    </div>
    <div class="w-full flex justify-end">
      <TopNavMenu v-show="active" :posts="posts" />
      <Button
        v-if="isDark"
        icon="sun"
        size="base"
        class="mt-0 ml-2 hidden md:block"
        @click="toggleDark()"
      />
      <Button
        v-else
        icon="moon"
        size="base"
        class="mt-0 ml-2 hidden md:block"
        @click="toggleDark()"
      />
    </div>
  </nav>
</template>
