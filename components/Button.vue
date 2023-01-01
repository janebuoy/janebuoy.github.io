<script setup>
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/vue/24/outline';

defineProps(['icon', 'size']);

const icons = {
  bars: Bars3Icon,
  'chevron-up': ChevronDownIcon,
  'chevron-down': ChevronUpIcon,
  'x-mark': XMarkIcon,
  moon: MoonIcon,
  sun: SunIcon,
};
const sizes = {
  sm: {
    height: '30px',
    width: '30px',
  },
  base: {
    height: '38px',
    width: '38px',
  },
};
</script>

<template>
  <button
    type="button"
    title="Menu"
    :style="sizes[size]"
    class="btn border rounded border-indigo-700"
    :class="[icon === 'moon' ? 'p-2' : 'p-[0.3rem]']"
  >
    <component :is="icons[icon]" class="text-indigo-800 dark:text-indigo-100" />
  </button>
</template>
