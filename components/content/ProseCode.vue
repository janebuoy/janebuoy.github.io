<script lang="ts">
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    }
  }
})
</script>

<template>
  <div class="pre-header dark:bg-zinc-900/50 bg-zinc-400/25 border  border-zinc-400/30 dark:border-zinc-900/80 rounded-t-md text-end py-1 px-2 text-code">
    {{ language.toLocaleUpperCase() }}
  </div>
  <slot />
</template>

<style lang="postcss">
pre code .line {
  display: block;
  min-height: 1rem;
}
pre {
	@apply p-3 bg-zinc-300/30 dark:bg-indigo-900/30 rounded-b-md text-code overflow-x-auto border-t-0 border-zinc-400/30 dark:border-zinc-900/80 border
}
</style>
