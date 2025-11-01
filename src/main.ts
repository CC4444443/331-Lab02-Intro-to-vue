import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from './router'
// Vercel Analytics: inject runtime analytics
import { inject } from '@vercel/analytics'
inject()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
