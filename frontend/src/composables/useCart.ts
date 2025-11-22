import { ref, computed } from 'vue'
import type { Product } from '@/composables/useProducts'

export interface CartItem {
  product: Product
  quantity: number
}

const items = ref<CartItem[]>([])

export function useCart() {
  const totalItems = computed(() =>
    items.value.reduce((suma, item) => suma + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce(
      (suma, item) => suma + item.quantity * item.product.price,
      0,
    ),
  )

  function addToCart(product: Product) {
    const existente = items.value.find(
      (item) => item.product.id === product.id,
    )

    if (existente) {
      existente.quantity += 1
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: string) {
    items.value = items.value.filter(
      (item) => item.product.id !== productId,
    )
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  }
}
