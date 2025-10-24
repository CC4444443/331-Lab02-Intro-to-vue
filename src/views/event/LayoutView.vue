<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { type Event } from '../../types'
import EventService from '../../services/EventService'

const event = ref<Event | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

onMounted(() => {
  EventService.getEvent(parseInt(props.id))
    .then((response: any) => {
      event.value = response.data
    })
    .catch(() => {
      router.push({
        name: '404-resource-view',
        params: { resource: 'event' },
      })
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>

<style scoped>
nav {
  margin-bottom: 1rem;
}
</style>
