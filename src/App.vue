<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
// SpeedInsights component (optional: requires @vercel/speed-insights)
// The package may expose a Vue integration; if not installed the import can be removed.
let SpeedInsights: any = null
try {
  // dynamic import avoids build-time failure if package not present locally
  // Vite will still include this if the package is installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // @ts-ignore
  SpeedInsights = require('@vercel/speed-insights/vue').default || require('@vercel/speed-insights').SpeedInsights
} catch (e) {
  // package not installed locally — it's optional for demo on Vercel
  SpeedInsights = null
}

// flash message example (empty by default)
const message = ref('')
</script>

<template>
  <div id="layout">
    <header>
      <!-- SpeedInsights component (renders Vercel speed insights UI when available) -->
      <component v-if="SpeedInsights" :is="SpeedInsights" />

      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'students' }">Students</RouterLink> |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Nav link styling is applied via Tailwind utility classes on the RouterLink components.
   Removed the old .router-link-exact-active CSS in favor of Vue's exact-active-class attribute.
*/
nav {
  /* kept intentionally minimal; per-link classes handle styling */
}

h2 {
  font-size: 20px;
}
</style>
