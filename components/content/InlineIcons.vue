<script setup>
import { EnvelopeIcon, UserCircleIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['type']);

const icons = reactive({
  envelope: EnvelopeIcon,
  'user-circle': UserCircleIcon,
});
</script>

<template>
  <component
    :is="icons[props.type]"
    class="h-4 w-4 text-indigo-700 inline"
  ></component>
</template>
