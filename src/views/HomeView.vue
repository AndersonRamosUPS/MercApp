<script setup lang="ts">
import { useProducts } from "../composables/useProducts";

const { products, loading, error } = useProducts();
</script>

<template>
  <section>
    <h1>Catálogo de Productos</h1>

    <!-- Mensajes de estado -->
    <p v-if="loading">Cargando productos...</p>
    <p v-else-if="error" class="error">
      {{ error }}
    </p>

    <!-- Lista de productos -->
    <ul v-else>
      <li v-if="products.length === 0">
        No hay productos disponibles.
      </li>
      <li
        v-for="product in products"
        :key="product.id"
      >
        {{ product.name }} - $ {{ product.price.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

.error {
  color: #b00020;
  margin-bottom: 0.5rem;
}
</style>
