import { createRouter, createWebHistory } from 'vue-router';


import HomeTodo from '@/view/HomeTodo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todo',
      name: 'HomeTodo',
      component: HomeTodo
    }
  ],
})

export default router;