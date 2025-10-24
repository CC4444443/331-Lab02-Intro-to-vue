<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import EventMeta from '../components/EventMeta.vue'
import { type Event } from '../types'
import { ref, onMounted, computed, watchEffect, withDefaults } from 'vue'
import EventService from '../services/EventService'

// API endpoint: set VITE_API_URL in .env to point to your my-json-server URL
const API_URL = import.meta.env.VITE_API_URL || 'https://my-json-server.typicode.com/CC4444443/331-Lab02-Intro-to-vue/events'

const events = ref<Event[] | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const offlineNote = ref<string | null>(null)
const totalEvents = ref(0)

const props = withDefaults(defineProps<{ page?: number }>(), { page: 1 })
const page = computed(() => props.page as number)

const hasNexPage = computed(() => {
  const totalPages = Math.ceil((totalEvents.value || 0) / 2)
  return page.value < totalPages
})

async function loadEvents(perPage = 2, pageNum = 1) {
  loading.value = true
  error.value = null
  try {
    const res = await EventService.getEvents(perPage, pageNum)
    const data = res.data
    events.value = Array.isArray(data) ? data : []
    totalEvents.value = Number(res.headers['x-total-count'] ?? res.headers['X-Total-Count'] ?? 0)
  } catch (err: any) {
    error.value = err?.message || String(err)
    try {
      const localRes = await fetch('/db.json')
      const localData = await localRes.json()
      events.value = Array.isArray(localData.events) ? localData.events : []
      offlineNote.value = 'Using local data; newly added events are saved in your browser.'
    } catch (e) {
      events.value = []
    }
  } finally {
    loading.value = false
  }
  // always merge any locally saved events
  mergeLocalStorage()
}

onMounted(() => {
  watchEffect(() => {
    events.value = null
    loading.value = true
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = Array.isArray(response.data) ? response.data : []
        totalEvents.value = Number(response.headers['x-total-count'] ?? response.headers['X-Total-Count'] ?? 0)
        mergeLocalStorage()
      })
      .catch((err) => {
        console.error('Error loading events via EventService:', err)
        // fallback to previous loader which will read /db.json
        loadEvents(2, page.value)
      })
      .finally(() => {
        loading.value = false
      })
  })
})

const newEvent = ref<Partial<Event>>({ title: '', category: '', date: '', time: '', organizer: '', location: '', description: '', petsAllowed: false })

async function addEvent() {
  // create a simple id if API doesn't provide one
  const payload = {
    id: Date.now(),
    title: newEvent.value.title || 'Untitled Event',
    category: newEvent.value.category || '',
    date: newEvent.value.date || '',
    time: newEvent.value.time || '',
    organizer: newEvent.value.organizer || '',
    location: newEvent.value.location || '',
    description: newEvent.value.description || '',
    petsAllowed: !!newEvent.value.petsAllowed,
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  if (!res.ok) throw new Error(`POST failed ${res.status}`)
  // refresh list
  await loadEvents(2, page.value)
    // clear form
    newEvent.value = { title: '', category: '', date: '', time: '', organizer: '', location: '', description: '', petsAllowed: false }
  } catch (err: any) {
    // if POST fails (for example my-json-server is read-only), persist to localStorage and show message
    const stored = JSON.parse(localStorage.getItem('localEvents') || '[]') as Event[]
    stored.push(payload as Event)
    localStorage.setItem('localEvents', JSON.stringify(stored))
  // update displayed list immediately
  events.value = [payload as Event, ...(events.value ?? [])]
    offlineNote.value = 'Remote POST failed; event saved locally in your browser.'
    // also show guidance
    alert('Remote POST failed: event saved locally. If you want persistence across devices, edit db.json in your GitHub repo and re-create the mock server (my-json-server is read-only).')
  }
}

// merge localStorage events (persisted via our addEvent fallback)
function mergeLocalStorage() {
  const stored = JSON.parse(localStorage.getItem('localEvents') || '[]') as Event[]
  if (stored.length) {
    // prepend stored events so they are visible immediately
    events.value = [...stored, ...(events.value ?? [])]
  }
}
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div>
    <button @click="loadEvents(2, page)" style="margin-bottom: 1rem">Reload events</button>
    <div v-if="loading">Loading events...</div>
    <div v-else-if="error">Failed to load events: {{ error }}</div>
    <div v-else>
      <div class="events">
        <div v-for="event in events" :key="event.id" class="event-row">
          <EventCard :event="event" />
          <EventMeta :event="event" />
        </div>
      </div>

  <section style="margin-top: 2rem; text-align:left; max-width:640px; margin-left:auto; margin-right:auto;">
        <h3>Add a new event (demo)</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
          <input v-model="newEvent.title" placeholder="Title" />
          <input v-model="newEvent.category" placeholder="Category" />
          <input v-model="newEvent.date" placeholder="Date" />
          <input v-model="newEvent.time" placeholder="Time" />
          <input v-model="newEvent.organizer" placeholder="Organizer" />
          <input v-model="newEvent.location" placeholder="Location" />
          <input v-model="newEvent.description" placeholder="Description" style="grid-column:1 / -1" />
          <label style="grid-column:1 / -1"><input type="checkbox" v-model="newEvent.petsAllowed" /> Pets allowed</label>
        </div>
        <button @click="addEvent" style="margin-top:0.5rem">Add event</button>
      </section>
      <div class="pagination" style="max-width:640px; margin: 1rem auto;">
        <RouterLink
          id="page-prev"
          :to="{ name: 'event-list-view', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          >&#60; Prev Page</RouterLink
        >

        <RouterLink
          id="page-next"
          :to="{ name: 'event-list-view', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNexPage"
          >Next Page &#62;</RouterLink
        >
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

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
