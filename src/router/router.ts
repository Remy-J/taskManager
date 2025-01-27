import { createRouter, createWebHistory } from 'vue-router'

import TodoListView from '../view/TodoListView.vue'
import DashboardView from '../view/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoListView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

export default router