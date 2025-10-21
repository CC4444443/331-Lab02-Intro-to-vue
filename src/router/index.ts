import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentsView from '../views/StudentsView.vue'

const routes = [
  { path: '/', name: 'event-list-view', component: EventListView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/students', name: 'students', component: StudentsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
