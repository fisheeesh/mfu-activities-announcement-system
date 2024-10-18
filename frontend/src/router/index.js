import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Upcoming from '@/views/dashboard/Upcoming.vue'
import History from '@/views/dashboard/History.vue'
import Create from '@/views/dashboard/Create.vue'
import Ongoing from '@/views/dashboard/Ongoing.vue'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'
import AdminLogin from '@/views/auth/AdminLogin.vue'

const routes = [
  {
    path: '/',
    redirect: '/admin/login'
  },
  {
    path: '/admin',
    component: DashboardLayout, 
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'create',
        name: 'create',
        component: Create
      },
      {
        path: 'ongoing',
        name: 'ongoing',
        component: Ongoing
      },
      {
        path: 'upcoming',
        name: 'upcoming',
        component: Upcoming
      },
      {
        path: 'history',
        name: 'history',
        component: History
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router