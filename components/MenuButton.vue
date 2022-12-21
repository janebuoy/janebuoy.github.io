<template>
  <button
    type="button"
    title="Menu"
    class="btn md:hidden h-[38px] w-[38px] mt-3 p-1 border rounded border-indigo-700"
  >
    <Bars3Icon class="text-indigo-800 dark:text-indigo-100" />
  </button>
</template>

<script>
import { Bars3Icon } from '@heroicons/vue/24/outline';
export default {
  components: { Bars3Icon },
};
</script>
