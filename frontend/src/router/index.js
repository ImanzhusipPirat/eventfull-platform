import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import CreateEvent from '../views/CreateEvent.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/events/create',
    name: 'CreateEvent',
    component: CreateEvent,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 