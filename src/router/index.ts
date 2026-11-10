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
      component: () => import('../app/features/auth/auth.component.vue'),
      children: [
        {
          path: "/",
          component: () => import("../app/features/auth/pages/login-component/login.component.vue")
        },
        {
          path: "/auth/signup",
          component: () => import("../app/features/auth/pages/signup-component/sign-up.component.vue")
        }
      ]
    }
  ],
})

export default router
