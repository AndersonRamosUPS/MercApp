// src/composables/useProducts.ts
import { ref, onMounted } from "vue";
import { apiGet } from "../services/api";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  categoryId?: string | null;
}

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useProducts() {
  const loadProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      // GET http://localhost:3000/api/products
      products.value = await apiGet<Product[]>("/products");
    } catch (err: any) {
      console.error(err);
      error.value = err?.message ?? "Error al cargar productos";
    } finally {
      loading.value = false;
    }
  };

  // Cargar automaticamente cuando se use el composable
  onMounted(() => {
    loadProducts();
  });

  return {
    products,
    loading,
    error,
    loadProducts,
  };
}
