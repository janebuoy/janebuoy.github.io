<script setup>
import {
  EnvelopeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps(['type']);

const icons = reactive({
  envelope: EnvelopeIcon,
  'user-circle': UserCircleIcon,
  'chat-bubble-left': ChatBubbleLeftIcon,
  'chat-bubble-left-ellipsis': ChatBubbleLeftEllipsisIcon,
});
</script>

<template>
  <component :is="icons[props.type]" class="h-4 w-4 inline"></component>
</template>
