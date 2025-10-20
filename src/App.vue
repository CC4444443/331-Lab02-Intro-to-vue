<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav>
    <a href="#">Home</a> |
    <a href="#">About</a>
  </nav>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<style scoped>
nav {
  padding: 1rem;
}
nav a {
  margin: 0 0.5rem;
  color: inherit;
  text-decoration: none;
}
</style>
