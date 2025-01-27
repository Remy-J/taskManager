import { defineStore } from "pinia";
import { ref } from "vue";
import defaultTodos from "../dataMocks/defaultTodos.json";

/**
 * @typedef {Object} Todo
 * @property {number} id - Task creation timestamp
 * @property {string} title - Task title
 * @property {boolean} completed - Task completion status
 * @property {Date|null} completedAt - Task completion date
 */
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  completedAt: Date | null;
}

/**
 * Pinia store for todo management
 * @returns {Object} Store methods and state
 */
export const useTodoStore = defineStore("todos", () => {
  /** @type {Ref<Todo[]>} Reactive todos list */
  const todos = ref<Todo[]>(
    defaultTodos.todos.map((todo) => ({
      ...todo,
      completedAt: todo.completedAt ? new Date(todo.completedAt) : null,
    }))
  );

  /**
   * Add a new task
   * @param {Object} todo - New task data
   * @param {string} todo.title - Task title
   */
  function addTodo(todo: { title: string }) {
    todos.value.unshift({
      id: Date.now(),
      completed: false,
      completedAt: null,
      ...todo,
    });
  }

  /**
   * Toggle task completion status
   * @param {number} id - Task ID to toggle
   */
  function toggleTodo(id: number) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.completedAt = todo.completed ? new Date() : null;
    }
  }

  /**
   * Remove a task
   * @param {number} id - Task ID to remove
   */
  function removeTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
});
