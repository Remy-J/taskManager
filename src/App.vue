<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="pt-24 pb-8 px-2 sm:px-4 overflow-x-hidden">
      <router-view></router-view>
    </main>
  </div>
</template>
