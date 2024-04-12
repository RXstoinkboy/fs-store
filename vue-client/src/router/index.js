import { createRouter, createWebHistory } from 'vue-router'
import LayoutWithNavigation from '@/layouts/LayoutWithNavigation.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: LayoutWithNavigation
      }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: {
        layout: LayoutWithNavigation
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        layout: LayoutWithNavigation
      }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/LoginView.vue'),
      meta: {
        layout: LayoutWithNavigation
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        layout: LayoutWithNavigation,
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next({
      name: 'sign-in',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
