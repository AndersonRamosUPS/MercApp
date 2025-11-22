<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="app">
    <NavBar />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>
