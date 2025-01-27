<template>
  <header
    class="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 shadow-lg z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center h-12">
        <!-- Logo et Titre -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <h1 class="text-white font-bold text-xl flex items-center -mt-2">
            <span class="text-emerald-400">Task</span>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Master</span>
          </h1>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link to="/"
            class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5 text-white relative group"
            :class="{ 'bg-white/10 text-emerald-400 shadow-md': route.path === '/' }">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Todo List</span>
            </span>
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-300 w-0 group-hover:w-full"></span>
          </router-link>

          <router-link to="/dashboard"
            class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/5 text-white relative group"
            :class="{ 'bg-white/10 text-emerald-400 shadow-md': route.path === '/dashboard' }">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Dashboard</span>
            </span>
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-300 w-0 group-hover:w-full"></span>
          </router-link>
        </div>

        <!-- Menu Mobile -->
        <button
          class="md:hidden text-black p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
          @click="isMenuOpen = !isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu Mobile Déroulant -->
      <div v-show="isMenuOpen"
        class="md:hidden mt-4 rounded-lg bg-slate-800/95 backdrop-blur-sm border border-white/5 overflow-hidden">
        <router-link to="/"
          class="flex items-center space-x-2 text-white font-medium px-4 py-3 hover:bg-white/5 transition-colors"
          :class="{ 'bg-white/10 text-emerald-400': route.path === '/' }" @click="isMenuOpen = false">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Todo List</span>
        </router-link>

        <router-link to="/dashboard"
          class="flex items-center space-x-2 text-white font-medium px-4 py-3 hover:bg-white/5 transition-colors"
          :class="{ 'bg-white/10 text-emerald-400': route.path === '/dashboard' }" @click="isMenuOpen = false">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Dashboard</span>
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
 * @requires vue-router
 */
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isMenuOpen = ref(false)
</script>
