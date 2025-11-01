import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from './router'
// Vercel Analytics: inject runtime analytics when available
try {
	// dynamic import so local dev doesn't fail if package not installed
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	// @ts-ignore
	const { inject } = require('@vercel/analytics')
	if (typeof inject === 'function') inject()
} catch (e) {
	// package not installed locally; skip injection
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
