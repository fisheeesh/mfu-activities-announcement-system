import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/dashboard/DashboardView.vue'
import Upcoming from '@/views/dashboard/UpcomingView.vue'
import History from '@/views/dashboard/HistoryView.vue'
import Create from '@/views/dashboard/CreateView.vue'
import Ongoing from '@/views/dashboard/OngoingView.vue'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'
import AdminLogin from '@/views/dashboard/AdminLoginView.vue'
import NotFound from '@/views/404/NotFoundView.vue'
import Edit from '@/views/dashboard/EditView.vue'
import { auth } from '@/firebase/config'
import Test from '@/views/Test/Test.vue'

const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/',
    name: 'login',
    component: AdminLogin,
    beforeEnter(to, from, next) {
      let user = auth.currentUser
      if (!user) {
        next()
      }
      else {
        next('/admin/dashboard')
      }
    }
  },
  {
    path: '/admin',
    component: DashboardLayout, 
    beforeEnter(to, from, next) {
      let user = auth.currentUser
      if (user) {
        next()
      }
      else {
        next('/')
      }
    },
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
      },
      {
        path : 'edit/:id',
        name : 'edit',
        component : Edit,
        props : true
      }
    ]
  },
  {
    path: '/admin/activity/create',
    name: 'create',
    component: Create
  },
  {
    path : '/:catchAll(.*)',
    name : 'not-found',
    component : NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router