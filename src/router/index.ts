import { createRouter, createWebHistory } from "vue-router";

// Lazy load de vistas
const HomeView = () => import("../views/HomeView.vue");
const ProductDetailView = () => import("../views/ProductDetailView.vue");
const CartView = () => import("../views/CartView.vue");
const NotFoundView = () => import("../views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/producto/:id",
      name: "product-detail",
      component: ProductDetailView,
      props: true,
    },
    {
      path: "/carrito",
      name: "cart",
      component: CartView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
