import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentsView from '../views/StudentsView.vue'
import EventDetailView from '../views/event/DetailView.vue'
import EventRegisterView from '../views/event/RegisterView.vue'
import EventEditView from '../views/event/EditView.vue'
import EventLayoutView from '../views/event/LayoutView.vue'

const routes = [
  { path: '/', name: 'event-list-view', component: EventListView, props: (route: any) => ({ page: parseInt(route.query.page?.toString() || '1') }) },
  {
    path: '/event/:id',
    name: 'event-layout-view',
    component: EventLayoutView,
    props: true,
    children: [
      { path: '', name: 'event-detail-view', component: EventDetailView, props: true },
      { path: 'register', name: 'event-register-view', component: EventRegisterView, props: true },
      { path: 'edit', name: 'event-edit-view', component: EventEditView, props: true },
    ],
  },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/students', name: 'students', component: StudentsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
