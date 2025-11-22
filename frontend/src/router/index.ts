import { createRouter, createWebHistory } from "vue-router";

// Lazy load de vistas
const HomeView = () => import("@/views/HomeView.vue");
const ProductDetailView = () => import("@/views/ProductDetailView.vue");
const ProductFormView = () => import("@/views/ProductFormView.vue");
const CartView = () => import("@/views/CartView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product/new",
      name: "product-new",
      component: ProductFormView,
    },
    {
      //Ruta dinamica por id
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
    },
     {
      path: '/product/:id/edit',
      name: 'product-edit',
      component: ProductFormView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      //Ruta 404
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
