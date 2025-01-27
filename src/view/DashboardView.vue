<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <template #title>Task Status Overview</template>
        <HighChart type="pie" :data="pieChartData" />
        <template #footer>
          <div class="text-sm text-gray-500">
            Total tasks: {{ tasksLength }}
          </div>
        </template>
      </Card>

      <Card>
        <template #header>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-slate-800">Tasks Creation</h2>
            <select v-model="selectedChartType" class="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 
                   focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none
                   cursor-pointer hover:bg-slate-50 transition-colors">
              <option v-for="{ value, label } in chartTypes" :key="value" :value="value">{{ label }}</option>
            </select>
          </div>
        </template>
        <HighChart :type="selectedChartType" :data="barChartCreationData" />
        <template #footer>
          <div class="text-sm text-gray-500">
            Total tasks created: {{ tasksLength }}
          </div>
        </template>
      </Card>

      <Card>
        <template #title>Completion Trends</template>
        <HighChart type="bar" :data="barChartCompletedData" />
        <template #footer>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Completed: {{ completedTasksLength }}</span>
            <span>Pending: {{ inProgressTasksLength }}</span>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Dashboard view component
 * @component
 * @description Displays various charts and statistics about todos
 *  
 * This component uses Chart components to visualize:
 * - Task status distribution (pie chart)
 * - Task creation timeline (bar chart)
 * - Task completion timeline (bar chart)
 */

import { computed, ref } from 'vue'
import { useTodoStore } from '../stores/todosStore'
import HighChart from '../components/HighChart.vue';
import Card from '../components/Card.vue';

const todoStore = useTodoStore()


const chartTypes = [
  { value: 'column', label: 'Column Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' }
] as const

const selectedChartType = ref<'column' | 'bar' | 'line'>('column')

const todoList = computed(() => todoStore.todos)

const pieChartData = computed(() => {
  return [
    { name: 'Completed', value: todoList.value.filter(t => t.completed).length },
    { name: 'In progress', value: todoList.value.filter(t => !t.completed).length }
  ]
})

const barChartCreationData = computed(() => {
  const tasksByDate = todoList.value.reduce((acc, task) => {
    const date = new Date(task.id).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(tasksByDate)
    .map(([date, count]) => ({
      name: new Date(date).toLocaleDateString(),
      value: count,
      sortDate: date
    }))
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
    .map(({ name, value }) => ({ name, value }))
})

const barChartCompletedData = computed(() => {
  const completedTasks = todoList.value.filter(t => t.completed && t.completedAt)
  const tasksByDate = completedTasks.reduce((acc, task) => {
    const date = task.completedAt!.toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(tasksByDate)
    .map(([date, count]) => ({
      name: new Date(date).toLocaleDateString(),
      value: count,
      sortDate: date
    }))
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
    .map(({ name, value }) => ({ name, value }))
})

const tasksLength = computed(() => todoList.value.length)

const completedTasksLength = computed(() => todoList.value.filter(t => t.completed).length)

const inProgressTasksLength = computed(() => todoList.value.filter(t => !t.completed).length)

</script>
