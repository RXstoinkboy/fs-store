import { createRouter, createWebHistory } from 'vue-router'
import LayoutWithNavigation from '@/layouts/LayoutWithNavigation.vue'

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
    }
  ]
})

export default router
