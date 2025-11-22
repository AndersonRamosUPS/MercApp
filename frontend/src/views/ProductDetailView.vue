<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductDetail } from "@/composables/useProductDetail";
import { useCart } from "@/composables/useCart";

const route = useRoute();
const router = useRouter();
const { producto, cargandoProducto, errorProducto, cargarProducto } =
  useProductDetail();
const { addToCart } = useCart();

function cargarDesdeRuta() {
  const id = route.params.id as string | undefined;
  if (!id) return;
  cargarProducto(id);
}

onMounted(cargarDesdeRuta);

watch(
  () => route.params.id,
  () => cargarDesdeRuta()
);

function volverAlCatalogo() {
  router.push({ name: "home" });
}

function agregarAlCarrito() {
  if (producto.value) {
    addToCart(producto.value);
  }
}
</script>

<template>
  <section>
    <button type="button" @click="volverAlCatalogo">
      ← Volver al catálogo
    </button>

    <p v-if="cargandoProducto">Cargando producto...</p>
    <p v-else-if="errorProducto" class="error">
      {{ errorProducto }}
    </p>

    <article v-else-if="producto" class="detalle">
      <div v-if="producto.imageUrl" class="detalle__imagen">
        <img :src="producto.imageUrl" :alt="producto.name" />
      </div>

      <h1>{{ producto.name }}</h1>

      <p class="detalle__precio">$ {{ producto.price.toFixed(2) }}</p>

      <p>
        Stock:
        <strong>
          {{ producto.stock > 0 ? producto.stock : "Sin stock" }}
        </strong>
      </p>

      <p class="detalle__descripcion">
        {{ producto.description || "Sin descripción." }}
      </p>

      <button
        type="button"
        :disabled="producto.stock <= 0"
        @click="agregarAlCarrito"
      >
        Añadir al carrito
      </button>
      <button
        type="button"
        @click="
          router.push({ name: 'product-edit', params: { id: route.params.id } })
        "
      >
        Editar
      </button>
    </article>

    <p v-else>Producto no encontrado.</p>
  </section>
</template>

<style scoped>
.detalle {
  margin-top: 1rem;
  max-width: 600px;
}

.detalle__imagen {
  width: 100%;
  max-height: 280px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.detalle__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detalle__precio {
  font-size: 1.2rem;
  font-weight: 700;
}

.detalle__descripcion {
  margin: 1rem 0;
}

.error {
  color: #ff6b6b;
}
</style>
