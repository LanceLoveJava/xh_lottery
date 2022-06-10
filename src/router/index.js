import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: '/',
        redirect: '/lottery',
      },
      {
          path:'/home',
          component: () => import('@/views/home.vue'),
          meta: {
              title: '首页'
          }
      },
      {
        path:'/lottery',
        component: () => import('@/views/lottery.vue'),
        meta: {
            title: '抽奖'
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes})
export default router