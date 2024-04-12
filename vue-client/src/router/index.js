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
      path: '/profiles/me',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        layout: LayoutWithNavigation,
        requiredRole: 'user'
      }
    },
    {
      path: '/profiles',
      name: 'profiles-list',
      component: () => import('../views/ProfilesListView.vue'),
      meta: {
        layout: LayoutWithNavigation,
        requiredRole: 'admin'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiredRole && !authStore.isAuthenticated) {
    next({
      name: 'sign-in',
      query: {
        redirect: to.fullPath
      }
    })
    return
  }

  if (to.meta.requiredRole && !authStore.hasRole(to.meta.requiredRole) && !authStore.hasRole('admin')) {
    next({ name: 'home' })
    return true;
  }

  next();
  return false;
})

export default router
