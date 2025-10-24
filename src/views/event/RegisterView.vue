<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { type Event } from '../../types'

const props = defineProps<{
  event: Event
  id?: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)

const router = useRouter()

const register = async () => {
  // TODO: call real registration API when available
  console.log('[RegisterView] register clicked for event', event?.value?.id)
  // simulate successful registration and navigate back to detail
  router.push({ name: 'event-detail-view' })
}
</script>

<template>
  <p>Register event here</p>
  <button @click="register">Register</button>
</template>
