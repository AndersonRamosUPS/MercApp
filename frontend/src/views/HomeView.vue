<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProducts, type Product } from '@/composables/useProducts'
import { useCategories } from '@/composables/useCategories'
import { useCart } from '@/composables/useCart'
import ProductCard from '@/components/ProductCard.vue'

const busqueda = ref('')
const categoriaSeleccionada = ref<'todas' | string>('todas')

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

const { addToCart } = useCart()

const cargando = computed(
  () => cargandoProductos.value || cargandoCategorias.value,
)

const mensajeError = computed(
  () => errorProductos.value || errorCategorias.value,
)

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

function manejarProductoAñadido(producto: Product) {
  addToCart(producto)
}
</script>

<template>
  <section>
    <h1>Catálogo de Productos</h1>

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

    <p v-if="cargando">Cargando productos...</p>
    <p v-else-if="mensajeError" class="error">
      {{ mensajeError }}
    </p>

    <div v-else class="grid-productos">
      <p v-if="productosVisibles.length === 0">
        No se encontraron productos.
      </p>

      <ProductCard
        v-for="producto in productosVisibles"
        :key="producto.id"
        :product="producto"
        @added-to-cart="manejarProductoAñadido"
      />
    </div>
  </section>
</template>

<style scoped>
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

.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.error {
  color: #ff6b6b;
}
</style>
