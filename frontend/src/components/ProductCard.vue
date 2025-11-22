<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/composables/useProducts'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (event: 'added-to-cart', product: Product): void
}>()

const router = useRouter()

const hayStock = computed(() => props.product.stock > 0)

function verDetalle() {
  router.push({
    name: 'product-detail',
    params: { id: props.product.id },
  })
}

function agregarAlCarrito() {
  emit('added-to-cart', props.product)
}
</script>

<template>
  <article class="tarjeta-producto">
    <div v-if="product.imageUrl" class="tarjeta-producto__imagen">
      <img :src="product.imageUrl" :alt="product.name" />
    </div>

    <h2 class="tarjeta-producto__nombre">
      {{ product.name }}
    </h2>

    <p class="tarjeta-producto__precio">
      $ {{ product.price.toFixed(2) }}
    </p>

    <p class="tarjeta-producto__stock">
      Stock:
      <span :class="{ 'stock-bajo': !hayStock, 'stock-ok': hayStock }">
        {{ hayStock ? product.stock : 'Sin stock' }}
      </span>
    </p>

    <p class="tarjeta-producto__descripcion">
      {{ product.description || 'Sin descripción.' }}
    </p>

    <div class="tarjeta-producto__acciones">
      <button type="button" @click="verDetalle">
        Ver detalle
      </button>

      <button
        type="button"
        :disabled="!hayStock"
        @click="agregarAlCarrito"
      >
        Añadir
      </button>
    </div>
  </article>
</template>

<style scoped>
.tarjeta-producto {
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tarjeta-producto__imagen {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.tarjeta-producto__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tarjeta-producto__nombre {
  font-size: 1.05rem;
  font-weight: 600;
}

.tarjeta-producto__precio {
  font-weight: 700;
}

.tarjeta-producto__stock span {
  font-weight: 600;
}

.stock-bajo {
  color: #ff6b6b;
}

.stock-ok {
  color: #4caf50;
}

.tarjeta-producto__descripcion {
  font-size: 0.9rem;
  opacity: 0.9;
}

.tarjeta-producto__acciones {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

button {
  flex: 1;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}
</style>
