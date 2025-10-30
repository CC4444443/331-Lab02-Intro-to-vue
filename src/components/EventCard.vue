<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Event } from '../types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="cursor-pointer border border-gray-600 p-4 w-64 mb-6 hover:scale-101 hover:shadow-sp">
      <h2>{{ event.title }}</h2>
      <span>@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Original .event-card styles removed in favor of Tailwind utility classes:
   cursor-pointer border border-gray-600 p-4 w-64 mb-6 hover:scale-101 hover:shadow-sp
   The hover rules are implemented with Tailwind's hover: variant and custom utilities.
*/

.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
