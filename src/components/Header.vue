<template>
  <header class="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg z-50">
    <nav class="max-w-7xl mx-auto px-2 sm:px-4 py-4">
      <div class="flex justify-between items-center h-10">
        <h1 class="text-white font-bold text-xl flex items-center h-full">
          <span class="text-amber-300">Task</span>Master
        </h1>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-4">
          <router-link to="/"
            class="text-white font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-white/10"
            :class="{ 'bg-white/20 text-amber-300 shadow-md': route.path === '/' }">
            Todo List
          </router-link>
          <router-link to="/dashboard"
            class="text-white font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-white/10"
            :class="{ 'bg-white/20 text-amber-300 shadow-md': route.path === '/dashboard' }">
            Dashboard
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-black p-2 rounded-lg hover:bg-white/10 transition-colors"
          @click="isMenuOpen = !isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="md:hidden mt-4 space-y-2 bg-white/10 rounded-lg p-2">
        <router-link to="/"
          class="block text-white font-semibold px-4 py-3 rounded-md transition-all duration-300 hover:bg-white/10"
          :class="{ 'bg-white/20 shadow-md': route.path === '/' }" @click="isMenuOpen = false">
          Todo List
        </router-link>
        <router-link to="/dashboard"
          class="block text-white font-semibold px-4 py-3 rounded-md transition-all duration-300 hover:bg-white/10"
          :class="{ 'bg-white/20 shadow-md': route.path === '/dashboard' }" @click="isMenuOpen = false">
          Dashboard
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
/**
 * Application header component
 * @component
 * @description Main navigation header with responsive menu and route navigation
 * 
 * @example
 * ```vue
 * <Header />
 * ```
 * 
 * @requires vue-router
 */
import { ref } from 'vue'
import { useRoute } from 'vue-router'

/** @type {import('vue-router').RouteLocationNormalizedLoaded} Current route */
const route = useRoute()

/** @type {Ref<boolean>} Controls mobile menu visibility */
const isMenuOpen = ref(false)
</script>
