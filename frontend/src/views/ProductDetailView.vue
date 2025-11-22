<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <section>
    <h1>Detalle del Producto</h1>
    <p>ID del producto: {{ id }}</p>

    <p>Se cargan los datos del producto desde la API.</p>
  </section>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
