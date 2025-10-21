<script setup lang="ts">
import type { Event } from '../types'
defineProps<{ event: Event }>()
</script>

<template>
  <div class="event-meta">
    <div class="category">{{ event.category }}</div>
    <div class="organizer">{{ event.organizer }}</div>
  </div>
</template>

<style scoped>
.event-meta {
  text-align: right;
}
.event-meta .category,
.event-meta .organizer {
  font-size: 14px;
}
</style>
