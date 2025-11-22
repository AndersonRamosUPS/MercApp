<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useCategories } from '@/composables/useCategories'

// estado de filtros
const busqueda = ref('')
const categoriaSeleccionada = ref<'todas' | string>('todas')

// composables que obtienen datos del API
const {
  products,
  loading: cargandoProductos,
  error: errorProductos,
} = useProducts()

const {
  categorias,
  cargandoCategorias,
  errorCategorias,
} = useCategories()

// estados combinados
const cargando = computed(() => cargandoProductos.value || cargandoCategorias.value)
const mensajeError = computed(() => errorProductos.value || errorCategorias.value)

// 🟦 🧠 AQUÍ va tu propiedad computada
const productosVisibles = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()

  return products.value.filter((producto) => {
    const coincideBusqueda =
      !texto ||
      producto.name.toLowerCase().includes(texto) ||
      (producto.description &&
        producto.description.toLowerCase().includes(texto))

    const coincideCategoria =
      categoriaSeleccionada.value === 'todas' ||
      producto.categoryId === categoriaSeleccionada.value

    return coincideBusqueda && coincideCategoria
  })
})
// 🟦 FIN de la computada
</script>


<template>
  <section>
    <h1>Catálogo de Productos</h1>

    <!-- Filtros -->
    <div class="filtros">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="categoriaSeleccionada">
        <option value="todas">Todas las categorías</option>

        <option
          v-for="categoria in categorias"
          :key="categoria.id"
          :value="categoria.id"
        >
          {{ categoria.nombre }}
        </option>
      </select>
    </div>

    <!-- Estados de carga / error -->
    <p v-if="cargando">Cargando productos...</p>
    <p v-else-if="mensajeError" class="error">
      {{ mensajeError }}
    </p>

    <!-- Lista filtrada -->
    <ul v-else>
      <li v-if="productosVisibles.length === 0">
        No se encontraron productos.
      </li>

      <li v-for="producto in productosVisibles" :key="producto.id">
        {{ producto.name }} - $ {{ producto.price.toFixed(2) }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.filtros input {
  flex: 1;
  min-width: 180px;
  padding: 0.5rem;
}

.filtros select {
  padding: 0.5rem;
}

.error {
  color: #ff6b6b;
}
</style>
