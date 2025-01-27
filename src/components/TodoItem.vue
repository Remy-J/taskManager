<template>
    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-purple-100">
        <div class="flex justify-start items-center gap-3 min-w-0">
            <input type="checkbox" :checked="todo.completed" @change="todoStore.toggleTodo(todo.id)"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <div class="group relative flex-1 min-w-0">
                <span :title="todo.title" @click.stop="toggleTooltip" class="truncate block cursor-pointer"
                    :class="{ 'line-through text-gray-400': todo.completed }">
                    {{ todo.title }}
                </span>
                <div v-if="showFullText" @click.stop
                    class="absolute left-0 top-full mt-2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10 max-w-xs break-words">
                    {{ todo.title }}
                    <div class="absolute -top-2 left-4 w-0 h-0 border-8 border-transparent border-b-gray-800"></div>
                </div>
            </div>
            <span v-if="todo.completed" class="text-green-600 shrink-0">
                {{ formatedData }}
            </span>
        </div>

        <button @click="handleDelete(todo.id)"
            class="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors ml-2"
            title="Delete task">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
/**
 * Individual todo item component
 * @component
 * @description Displays a single todo item with completion toggle, deletion, and tooltip functionality
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useTodoStore } from '../stores/todosStore';

/**
 * @typedef {Object} TodoItemProps
 * @property {number} id - Task ID
 * @property {string} title - Task title
 * @property {boolean} completed - Completion status
 * @property {Date|null} completedAt - Completion date
 */
interface Props {
    todo: {
        id: number;
        title: string;
        completed: boolean;
        completedAt: Date | null;
    }
}

const showFullText = ref(false)

const emit = defineEmits<{
    delete: [id: number]
}>();

const props = defineProps<Props>();
const todoStore = useTodoStore();

/**
 * Formats the completion date
 * @type {ComputedRef<string>} Formatted date string
 */
const formatedData = computed(() => {
    if (!props.todo.completedAt) return ''
    return new Date(props.todo.completedAt).toLocaleDateString()
})

/**
 * Toggles tooltip visibility
 */
function toggleTooltip() {
    showFullText.value = !showFullText.value;
}

/**
 * Handles click outside to close tooltip
 */
function handleClickOutside() {
    if (showFullText.value) {
        showFullText.value = false;
    }
}

/**
 * Emits delete event for the todo
 * @param {number} id - ID of the todo to delete
 */
function handleDelete(id: number) {
    emit('delete', id)
}

// Lifecycle hooks for tooltip click outside handling
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>