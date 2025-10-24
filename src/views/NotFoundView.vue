<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page',
  }
)
</script>

<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <router-link :to="{ name: 'event-list-view' }">Back to the home page</router-link>
</template>

<style scoped>
h1 {
  margin-bottom: 0.5rem;
}
h3 {
  margin-bottom: 1rem;
  font-weight: normal;
  color: #555;
}
</style>
