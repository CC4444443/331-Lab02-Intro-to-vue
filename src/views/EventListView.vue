<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import EventMeta from '../components/EventMeta.vue'
import type { Event } from '../types'
import { ref, onMounted } from 'vue'

// API endpoint: set VITE_API_URL in .env to point to your my-json-server URL
const API_URL = import.meta.env.VITE_API_URL || 'https://my-json-server.typicode.com/your-username/your-repo/events'

const events = ref<Event[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function loadEvents() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    // expecting an array at /events
    events.value = Array.isArray(data) ? data : []
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEvents()
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div>
    <button @click="loadEvents" style="margin-bottom: 1rem">Reload events</button>
    <div v-if="loading">Loading events...</div>
    <div v-else-if="error">Failed to load events: {{ error }}</div>
    <div v-else class="events">
      <div v-for="event in events" :key="event.id" class="event-row">
        <EventCard :event="event" />
        <EventMeta :event="event" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.event-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
