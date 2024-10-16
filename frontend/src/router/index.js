import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Upcoming from '@/views/dashboard/Upcoming.vue'
import Ongoing from '@/views/dashboard/Ongoing.vue'
import History from '@/views/dashboard/History.vue'
import Create from '@/views/dashboard/Create.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/upcoming',
    name : 'upcoming',
    component : Upcoming

  },
  {
    path : '/ongoing',
    name : 'ongoing',
    component : Ongoing
  },
  {
    path : '/history',
    name : 'history',
    component : History
  },
  {
    path : '/create',
    name : 'create',
    component : Create
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
