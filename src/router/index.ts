import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('../app/features/home/home.component.vue')
    },

    {
      path:"/auth",
      component: () => import('../app/features/auth/auth.component.vue')
    }
  ],
})

export default router
