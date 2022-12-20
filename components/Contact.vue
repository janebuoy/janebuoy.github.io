<template>
  <div class="content-card">
    <div class="content-text">
      <h2 id="contact"><a href="#contact">Contact</a></h2>
      <span class="block">
        <EnvelopeIcon class="h-4 w-4 text-indigo-800 inline"></EnvelopeIcon>
        <span class="pl-5"><a href="mailto:micrograph@posteo.de">micrograph@posteo.de</a></span>
      </span>
      <span class="block">
        <UserCircleIcon class="h-4 w-4 text-indigo-800 inline"></UserCircleIcon>
        <span class="pl-5"><a href="https://github.com/janebuoy">https://github.com/janebuoy</a></span>
      </span>
    </div>
  </div>
</template>

<script>
import { EnvelopeIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
export default {
  components: { EnvelopeIcon, UserCircleIcon }
}
</script>