<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '../../stores/message'
import { type Event } from '../../types'

const props = defineProps<{
  event: Event
  id?: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)

const router = useRouter()
const store = useMessageStore()

function saveEdit() {
  // Here you'd normally call an API to save the edited data.
  // For this exercise we just set the flash message and navigate to the detail view.
  const title = props.event?.title || ''
  store.updateMessage('Data has been updated for ' + title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  // Navigate to the event detail view (child route '')
  router.push({ name: 'event-detail-view', params: { id: props.id ?? props.event.id } })
}
</script>

<template>
  <div>
    <h2>Edit event: {{ event?.title }}</h2>
    <!-- Minimal edit UI for the lab: just a save button -->
    <button @click="saveEdit">Save changes</button>
  </div>
</template>
