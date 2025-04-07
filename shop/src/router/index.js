import { createRouter, createWebHistory } from 'vue-router'
import Shopping from '../views/Shopping.vue'
import Menu from '../views/Menu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catachAll(.*)',
      name: 'menu'
    },

    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping,
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
    },
  ],
})

export default router
