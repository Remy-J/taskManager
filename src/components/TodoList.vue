<template>
    <div class="max-w-7xl mx-auto px-4 py-4">
        <form @submit.prevent="handleSubmit" class="mb-8">
            <div class="flex flex-col sm:flex-row gap-4">
                <input v-model="newTodo" type="text" placeholder="New task..." class="flex-1 px-3 py-2 border border-purple-300 rounded-md shadow-sm 
                           focus:ring-2 focus:ring-purple-500 focus:border-purple-600 
                           bg-white text-gray-800 placeholder-gray-500 outline-none
                           w-full">
                <button type="submit" class="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 
                           rounded-md hover:from-indigo-700 hover:to-purple-700 
                           transition-all duration-300 shadow-md hover:shadow-lg
                           active:scale-95 outline-none">
                    Add Task
                </button>
            </div>
        </form>

        <div ref="containerRef" @scroll="handleScroll"
            class="h-[calc(100vh-22rem)] overflow-auto relative border border-purple-100 rounded-lg bg-white/50">
            <div :style="{ height: `${totalHeight}px` }" class="relative">
                <TodoItem v-for="{ item: todo, style } in visibleItems" :key="todo.id" :todo="todo" :style="style"
                    @delete="handleDelete" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Todo list component with virtual scrolling
 * @description Displays a list of todos with virtual scrolling for performance optimization
 *
 * @requires useVirtualList
 * @requires useTodoStore
 */
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todosStore'
import TodoItem from './TodoItem.vue'
import { useVirtualList } from '../composables/useVirtualList'

const todoStore = useTodoStore()

const newTodo = ref<string>('');

const todos = computed(() => todoStore.todos)

const {
    containerRef,
    visibleItems,
    totalHeight,
    handleScroll
} = useVirtualList(todos, {
    itemHeight: 70,
    overscan: 3
})

/**
 * Handles new task submission
 * @description Creates a new todo if the input is not empty
 */
function handleSubmit() {
    if (newTodo.value.trim()) {
        todoStore.addTodo({
            title: newTodo.value.trim()
        })
        newTodo.value = ''
    }
}

/**
 * Handles task deletion
 * @param {number} id - ID of the task to delete
 */
function handleDelete(id: number) {
    todoStore.removeTodo(id)
}
</script>